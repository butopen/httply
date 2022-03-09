import { Controller, Get } from '@nestjs/common';
import { DB, PostgresDbService } from './shared/postgres/postgres.service';

@Controller()
export class AppController {
  constructor(private readonly db: DB) {
    (db as PostgresDbService).checkDB();
  }

  @Get()
  getHello(): string {
    return 'ciao';
  }
}
