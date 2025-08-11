import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmailController } from "src/api/controllers/master/email.controller";
import { EmailService } from "./email.service";
import { ApiModule } from "src/api/api.module";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
