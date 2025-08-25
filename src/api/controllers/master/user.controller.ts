import { Controller, Post, Body, Get } from '@nestjs/common';
import { RequestEmailValidatorCodeRequest } from 'src/application/internal-services/master/user/services/request-email-validator-code/request-email-validator-code.request';
import { RequestEmailValidatorCodeService } from 'src/application/internal-services/master/user/services/request-email-validator-code/request-email-validator-code.service';
import { CheckEmailValidatorCodeRequest } from 'src/application/internal-services/master/user/services/check-email-validator-code/check-email-validator-code.request';
import { CheckEmailValidatorCodeService } from 'src/application/internal-services/master/user/services/check-email-validator-code/check-email-validator-code.service';
import { GetPoliciesService } from 'src/application/internal-services/master/policy/services/get-policies/get-policies.service';
import { GetRulesService } from 'src/application/internal-services/master/rule/get-rules.service';
import { CreateUserManagerService } from 'src/application/internal-services/master/user/services/create-user-manager/create-user-manager.service';
import { CreateUserBaseRequest } from 'src/application/common/models/request/create-user-base.request';
import { LoginRequest } from 'src/application/internal-services/master/user/services/login/login.request';
import { LoginService } from 'src/application/internal-services/master/user/services/login/login.service';
import { RefreshTokenRequest } from 'src/application/internal-services/master/user/services/refresh-token/refresh-token.request';
import { RefreshTokenService } from 'src/application/internal-services/master/user/services/refresh-token/refresh-token.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly requestEmailValidatorCodeService: RequestEmailValidatorCodeService,
    private readonly checkEmailValidatorCodeService: CheckEmailValidatorCodeService,
    private readonly getPoliciesService: GetPoliciesService,
    private readonly getRulesService: GetRulesService,
    private readonly createUserManagerService: CreateUserManagerService,
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  @Post("/generate-validator-code")
  async generateValidatorCode(
    @Body() request: RequestEmailValidatorCodeRequest
  ) {
    return await this.requestEmailValidatorCodeService.execute(request);
  }

  @Post("/check-email-validator-code")
  async checkEmailValidatorCode(
    @Body() request: CheckEmailValidatorCodeRequest
  ) {
    return await this.checkEmailValidatorCodeService.execute(request);
  }

  @Get("/policies")
  async getPolicies() {
    return await this.getPoliciesService.execute(null);
  }

  @Get("/rules")
  async getRules() {
    return await this.getRulesService.execute(null);
  }

  @Post("/master")
  async createUserMaster(@Body() request: CreateUserBaseRequest) {
    return await this.createUserManagerService.execute(request);
  }

  @Post("/login")
  async login(@Body() request: LoginRequest) {
    return await this.loginService.execute(request);
  }

  @Post("/refresh-token")
  async refreshToken(@Body() request: RefreshTokenRequest) {
    return await this.refreshTokenService.execute(request);
  }

}