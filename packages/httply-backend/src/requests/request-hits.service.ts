import { Injectable } from '@nestjs/common';
import { DB } from '../shared/postgres/postgres.service';
import { GdbTablesData } from '../generated/gdb-httply-test-tables';

@Injectable()
export class RequestHitsService {
  private tableName = 'hlrequesthit';

  constructor(private db: DB) {}

  async onModuleInit() {
    await this.db.query(`
            create table if not exists ${this.tableName} (
                requesthitid  BIGSERIAL PRIMARY KEY,
                requestid bigint REFERENCES ${GdbTablesData.hlrequest.tableName}(requestid),
                date TIMESTAMPTZ
            );
        `);
  }

  async save(requestid: number): Promise<Date> {
    const result = await this.db.query<{ date: Date }>(
      `insert into ${this.tableName} values(DEFAULT,$1,$2) returning date`,
      [requestid, new Date()],
    );
    return result[0].date;
  }
}
