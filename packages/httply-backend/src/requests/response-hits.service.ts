import { Injectable } from '@nestjs/common';
import { DB } from '../shared/postgres/postgres.service';
import { GdbTablesData } from '../generated/gdb-httply-test-tables';

@Injectable()
export class ResponseHitsService {
  private tableName = 'hlresponsehit';

  constructor(private db: DB) {}

  async onModuleInit() {
    await this.db.query(`
            create table if not exists ${this.tableName} (
                responsehitid  BIGSERIAL PRIMARY KEY,
                responseid bigint REFERENCES ${GdbTablesData.hlresponse.tableName}(responseid),
                date TIMESTAMPTZ
            );
        `);
  }

  async save(responseid: number): Promise<Date> {
    const result = await this.db.query<{ date: Date }>(
      `insert into ${this.tableName} values(DEFAULT,$1,$2) returning date`,
      [responseid, new Date()],
    );
    return result[0].date;
  }
}
