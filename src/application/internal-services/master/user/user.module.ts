
import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { RequestEmailValidatorCodeService } from './services/request-email-validator-code/request-email-validator-code.service';
import { ReposModule } from 'src/repos/repos.module';
import { EmailService } from '../../email/email.service';
import { ConfigService } from '@nestjs/config';
import { CheckEmailValidatorCodeService } from './services/check-email-validator-code/check-email-validator-code.service';
import { CreateUserManagerService } from './services/create-user-manager/create-user-manager.service';
import { TokenService } from 'src/application/common/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './services/login/login.service';

@Module({
  imports: [ReposModule],
  providers: [
    UsersService,
    RequestEmailValidatorCodeService,
    EmailService,
    ConfigService,
    CheckEmailValidatorCodeService,
    CreateUserManagerService,
    TokenService,
    JwtService,
    LoginService
  ], 
  exports: [
    UsersService,
    RequestEmailValidatorCodeService,
    CheckEmailValidatorCodeService,
    CreateUserManagerService,
    TokenService,
    JwtService,
    LoginService
  ]
})
export class UsersModule { }