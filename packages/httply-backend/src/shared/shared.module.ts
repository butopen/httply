import { Module } from '@nestjs/common';
import { DB, PostgresDbService } from './postgres/postgres.service';
import { ConfigurationService } from './configuration/configuration.service';
import { CryptService } from './crypt/crypt.service';

@Module({
  providers: [
    { provide: DB, useClass: PostgresDbService },
    ConfigurationService,
    CryptService,
  ],
  exports: [ConfigurationService, DB, CryptService],
})
export class SharedModule {}
