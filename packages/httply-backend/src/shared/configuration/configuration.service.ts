import { Injectable } from '@nestjs/common';
import { DBConfig } from '../httply.model';

@Injectable()
export class ConfigurationService {
  db() {
    const { DB_HOST, DB_PASSWORD, DB_USRENAME, DB_NAME } = process.env;
    return {
      host: DB_HOST,
      user: DB_USRENAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    } as DBConfig;
  }
}
