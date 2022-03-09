import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { RequestsService } from './requests/requests.service';
import { RequestHitsService } from './requests/request-hits.service';
import { ResponsesService } from './requests/responses.service';
import { ResponseHitsService } from './requests/response-hits.service';
import { RequestsController } from './requests/requests.controller';

@Module({
  imports: [ConfigModule.forRoot(), SharedModule],
  controllers: [AppController, RequestsController],
  providers: [
    RequestsService,
    RequestHitsService,
    ResponsesService,
    ResponseHitsService,
  ],
})
export class AppModule {
  constructor() {}
}
