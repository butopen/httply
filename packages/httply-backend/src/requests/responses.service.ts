import { Injectable } from '@nestjs/common';
import { DB } from '../shared/postgres/postgres.service';
import {
  GdbTablesData,
  Hlrequest,
  Hlresponse,
} from '../generated/gdb-httply-test-tables';

@Injectable()
export class ResponsesService {
  private tableName = 'hlresponse';

  constructor(private db: DB) {}

  async onModuleInit() {
    await this.db.query(`
            create table if not exists ${this.tableName} (
                responseid  BIGSERIAL PRIMARY KEY,
                requestid bigint REFERENCES ${GdbTablesData.hlrequest.tableName}(requestid),
                hash text,
                content jsonb,
                created TIMESTAMPTZ
            );
        `);
  }

  async save(r: Partial<Hlresponse>) {
    const result = await this.db.query<{ responseid: number }>(
      `insert into ${this.tableName} values(DEFAULT,$1,$2,$3,$4) returning responseid`,
      [r.requestid, r.hash, r.content, new Date()],
    );
    return result[0].responseid;
  }

  async findByHash(hash: string) {
    const { hlresponse } = GdbTablesData;
    const found = await this.db.query<Hlresponse>(
      `select * from ${hlresponse.tableName} where ${hlresponse.hash} = $1`,
      [hash],
    );
    return found[0];
  }

  async findById(responseid: number) {
    const { hlresponse } = GdbTablesData;
    const found = await this.db.query<Hlresponse>(
      `select * from ${hlresponse.tableName} where ${hlresponse.responseid} = $1`,
      [responseid],
    );
    return found[0];
  }
}
