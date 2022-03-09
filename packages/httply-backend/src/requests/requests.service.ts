import { Injectable } from '@nestjs/common';
import { DB } from '../shared/postgres/postgres.service';
import { GdbTablesData, Hlrequest } from '../generated/gdb-httply-test-tables';

@Injectable()
export class RequestsService {
  private tableName = 'hlrequest';

  constructor(private db: DB) {}

  async onModuleInit() {
    await this.db.query(`
            create table if not exists ${this.tableName} (
                requestid  BIGSERIAL PRIMARY KEY,
                path text,
                method text,
                domain text,
                hash text UNIQUE,
                content jsonb,
                created TIMESTAMPTZ
            );
        `);
  }

  async save(r: Partial<Hlrequest>) {
    const result = await this.db.query<{ requestid: number }>(
      `insert into ${this.tableName} values(DEFAULT,$1,$2,$3,$4,$5,$6) returning requestid`,
      [r.path, r.method, r.domain, r.hash, r.content, new Date()],
    );
    return result[0].requestid;
  }

  async findById(requestid: number) {
    const { hlrequest } = GdbTablesData;
    const found = await this.db.query<Hlrequest>(
      `select * from ${hlrequest.tableName} where ${hlrequest.requestid} = $1`,
      [requestid],
    );
    return found[0];
  }

  async findByHash(hash: string) {
    const { hlrequest } = GdbTablesData;
    const found = await this.db.query<Hlrequest>(
      `select * from ${hlrequest.tableName} where ${hlrequest.hash} = $1`,
      [hash],
    );
    return found[0];
  }
}
