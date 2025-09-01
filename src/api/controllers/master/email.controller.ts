import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { ApiTenant } from 'src/api/decorators/tenant.decorator';
import { EmailService } from 'src/application/internal-services/email/email.service';

export class SendEmailDto {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: Record<string, any>;
}

@Controller('email')
@ApiTenant()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('test-connection')
  async testConnection() {
    try {
      const success = await this.emailService.testConnection();
      
      if (success) {
        return { 
          message: 'Conexão SMTP testada com sucesso',
          status: 'success'
        };
      } else {
        throw new HttpException(
          'Falha na conexão SMTP',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new HttpException(
        'Erro ao testar conexão SMTP',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('send')
  async sendEmail(@Body() emailDto: SendEmailDto) {
    try {
      const success = await this.emailService.sendEmail(emailDto);
      
      if (!success) {
        throw new HttpException(
          'Falha ao enviar email',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return { message: 'Email enviado com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('welcome')
  async sendWelcomeEmail(@Body() { to, userName }: { to: string; userName: string }) {
    try {
      const success = await this.emailService.sendWelcomeEmail(to, userName);
      
      if (!success) {
        throw new HttpException(
          'Falha ao enviar email de boas-vindas',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return { message: 'Email de boas-vindas enviado com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('reset-password')
  async sendResetPasswordEmail(@Body() { to, resetToken }: { to: string; resetToken: string }) {
    try {
      const success = await this.emailService.sendResetPasswordEmail(to, resetToken);
      
      if (!success) {
        throw new HttpException(
          'Falha ao enviar email de redefinição de senha',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return { message: 'Email de redefinição de senha enviado com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}