import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { EmailConfig } from './models/email-config.model';
import { EmailOptions } from './models/email-options.model';

@Injectable()
export class EmailService implements OnModuleInit {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);
    private isInitialized = false;

    constructor(private configService: ConfigService) {
        // Não criar o transporter no construtor
    }

    async onModuleInit() {
        await this.initializeEmailService();
    }

    private async initializeEmailService() {
        try {
            await this.createTransporter();
            this.isInitialized = true;
            this.logger.log('✅ Serviço de email inicializado com sucesso');
        } catch (error) {
            this.logger.error('❌ Falha ao inicializar serviço de email:', error.message);
            // Não falhar a aplicação, apenas logar o erro
            this.isInitialized = false;
        }
    }

    private async createTransporter() {
        const config: EmailConfig = {
            host: this.configService.get<string>('SMTP_HOST')!,
            port: this.configService.get<number>('SMTP_PORT')!,
            secure: this.configService.get<string>('SMTP_SECURE')! === "true",
            user: this.configService.get<string>('SMTP_USER')!,
            pass: this.configService.get<string>('SMTP_PASS')!,
            from: this.configService.get<string>('SMTP_FROM')!,
        };
        
        this.validateConfig(config);

        // Configurações específicas para o Titans
        const transporterOptions: any = {
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
            // Configurações específicas para o Titans
            tls: {
                rejectUnauthorized: false, // Para evitar problemas de certificado SSL
                //ciphers: 'SSLv3', // Ciphers compatíveis com o Titans
            },
            // Timeout para conexão
            connectionTimeout: 60000,
            greetingTimeout: 30000,
            socketTimeout: 60000,
            // Configurações adicionais para estabilidade
            pool: false,
            maxConnections: 1,
            maxMessages: 1,
        };

        // Configurações específicas baseadas na porta
        if (config.port === 587) {
            transporterOptions.requireTLS = true;
            transporterOptions.ignoreTLS = false;
        }

        this.transporter = nodemailer.createTransport(transporterOptions);

        // Verificar conexão
        await this.verifyConnection();
    }

    private async verifyConnection(): Promise<void> {
        try {
            await this.transporter.verify();
            this.logger.log('✅ Conexão SMTP verificada com sucesso');
        } catch (error) {
            this.logger.error('❌ Erro na verificação da conexão SMTP:', error.message);
            
            // Sugestões específicas para o Titans
            if (error.code === 'EAUTH') {
                this.logger.error('💡 Erro de autenticação - Verifique:');
                this.logger.error('   - Usuário e senha estão corretos');
                this.logger.error('   - A conta não está bloqueada');
                this.logger.error('   - As configurações de SMTP estão corretas');
                this.logger.error('   - Para Titans: verifique se a senha não expirou');
            } else if (error.code === 'ETIMEDOUT') {
                this.logger.error('💡 Dica: Verifique se a porta e SSL estão corretos:');
                this.logger.error('   - Porta 465: use SMTP_SECURE=true');
                this.logger.error('   - Porta 587: use SMTP_SECURE=false');
            } else if (error.code === 'ECONNREFUSED') {
                this.logger.error('💡 Dica: Verifique se o host SMTP está correto');
                this.logger.error('   - Para Titans: smtp.titans.com.br');
            } else if (error.code === 'ECONNRESET') {
                this.logger.error('💡 Dica: Problema de conexão - verifique firewall/proxy');
            }
            
            // Log mais detalhado para debug
            this.logger.debug('Configuração atual:', {user: this.configService.get<string>('SMTP_USER')});
            
            throw error;
        }
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        if (!this.isInitialized) {
            this.logger.warn('⚠️ Serviço de email não inicializado. Tentando inicializar...');
            try {
                await this.initializeEmailService();
            } catch (error) {
                this.logger.error('❌ Falha ao inicializar serviço de email para envio');
                return false;
            }
        }

        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: this.configService.get<string>('SMTP_FROM'),
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                attachments: options.attachments,
            };

            // Se um template foi especificado, compilar com Handlebars
            if (options.template) {
                const templatePath = path.join(
                    process.cwd(),
                    'src/email/templates',
                    `${options.template}.hbs`
                );

                if (fs.existsSync(templatePath)) {
                    const templateSource = fs.readFileSync(templatePath, 'utf8');
                    const template = handlebars.compile(templateSource);
                    mailOptions.html = template(options.context || {});
                } else {
                    this.logger.warn(`Template não encontrado: ${templatePath}`);
                }
            }

            const result = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email enviado com sucesso: ${result.messageId}`);
            return true;
        } catch (error) {
            this.logger.error('Erro ao enviar email:', error);
            return false;
        }
    }

    // Métodos específicos para diferentes tipos de email
    async sendWelcomeEmail(to: string, userName: string): Promise<boolean> {
        return this.sendEmail({
            to,
            subject: 'Bem-vindo!',
            template: 'welcome',
            context: { userName },
        });
    }

    async sendResetPasswordEmail(to: string, resetToken: string): Promise<boolean> {
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

        return this.sendEmail({
            to,
            subject: 'Redefinir Senha',
            template: 'reset-password',
            context: { resetUrl },
        });
    }

    async sendNotificationEmail(
        to: string | string[],
        subject: string,
        message: string
    ): Promise<boolean> {
        return this.sendEmail({
            to,
            subject,
            template: 'notification',
            context: { message },
        });
    }

    async sendEmailWithAttachment(
        to: string,
        subject: string,
        message: string,
        attachments: Array<{
            filename: string;
            path?: string;
            content?: Buffer;
            contentType?: string;
        }>
    ): Promise<boolean> {
        return this.sendEmail({
            to,
            subject,
            html: message,
            attachments,
        });
    }

    private validateConfig(config: EmailConfig): void {
        if (!config.host) {
            throw new Error('SMTP_HOST é obrigatório');
        }
        if (!config.port) {
            throw new Error('SMTP_PORT é obrigatório');
        }
        if (!config.user) {
            throw new Error('SMTP_USER é obrigatório');
        }
        if (!config.pass) {
            throw new Error('SMTP_PASS é obrigatório');
        }

        // Validar combinação porta/secure
        if (config.port === 465 && !config.secure) {
            this.logger.warn('⚠️  Porta 465 geralmente requer SMTP_SECURE=true');
        }
        if (config.port === 587 && config.secure) {
            this.logger.warn('⚠️  Porta 587 geralmente usa SMTP_SECURE=false (STARTTLS)');
        }

        // Validações específicas para o Titans
        if (config.host.includes('titans')) {
            this.logger.log('🔧 Configuração detectada para Titans - aplicando configurações específicas');
        }
    }

    // Método para testar a conexão manualmente
    async testConnection(): Promise<boolean> {
        try {
            if (!this.transporter) {
                await this.initializeEmailService();
            }
            await this.transporter.verify();
            this.logger.log('✅ Teste de conexão SMTP bem-sucedido');
            return true;
        } catch (error) {
            this.logger.error('❌ Teste de conexão SMTP falhou:', error.message);
            return false;
        }
    }
}