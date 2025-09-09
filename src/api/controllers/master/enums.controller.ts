import { Controller, Get, Request } from '@nestjs/common';
import { ApiTenant } from 'src/api/decorators/tenant.decorator';
import { GetEnumsService } from 'src/application/internal-services/master/enum/get-enums.service';

@Controller('enums')
@ApiTenant()
export class EnumsController {
  constructor(
    private readonly getEnumsService: GetEnumsService
  ) { }

  @Get()
  async getAllEnums(@Request() req) {
    return await this.getEnumsService.execute(null, req);
  }

}
