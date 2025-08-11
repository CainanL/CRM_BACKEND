import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { EmailConfig } from './models/email-config.model';
import { EmailOptions } from './models/email-options.model';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor(private configService: ConfigService) {
        this.createTransporter();
    }

    private createTransporter() {
        const config: EmailConfig = {
            host: this.configService.get<string>('SMTP_HOST')!,
            port: this.configService.get<number>('SMTP_PORT')!,
            secure: this.configService.get<boolean>('SMTP_SECURE')!,
            user: this.configService.get<string>('SMTP_USER')!,
            pass: this.configService.get<string>('SMTP_PASS')!,
            from: this.configService.get<string>('SMTP_FROM')!,
        };

        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });

        // Verificar conexão
        this.transporter.verify((error, success) => {
            if (error) {
                this.logger.error('Erro na configuração do email:', error);
            } else {
                this.logger.log('Servidor de email configurado com sucesso');
            }
        });
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
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
}