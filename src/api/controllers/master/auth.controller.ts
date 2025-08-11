import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateUserRequest } from "src/application/internal-services/master/user/services/create-user/create-user.request";
import { CreateUserManagerService } from "src/application/internal-services/master/user/services/create-user-manager/create-user-manager.service";


@Controller('auth')
export class AuthController {
    constructor(private createUserService: CreateUserManagerService) {}
    
    @Post('register')
    async register(@Body() createUserRequest: CreateUserRequest) {
        // Validações
        const emailExists = await this.createUserService.checkEmailExists(createUserRequest.email);
        if (emailExists) {
            throw new BadRequestException('Email already exists');
        }

        const subdomainExists = await this.createUserService.checkIdExists(createUserRequest.email);
        if (subdomainExists) {
            throw new BadRequestException('Subdomain already exists');
        }

        // Criar usuário + tenant + banco
        //await this.createUserService.createUser(createUserRequest);

        return { message: 'User and tenant created successfully' };
    }
}