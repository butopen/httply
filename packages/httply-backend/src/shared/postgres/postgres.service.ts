import {Injectable} from '@nestjs/common';
import {DBConfig} from '../httply.model';
import {ConfigurationService} from '../configuration/configuration.service';

const pg = require('pg');
const {Pool} = pg;

export abstract class DB {
  abstract query<T>(
      q: string,
      params?: (string | number | Date | unknown)[],
      options?: { skipLogging: boolean },
  ): Promise<T[]>;

  abstract withConnection<T>(action: (connection) => any): Promise<T[]>;
}

@Injectable()
export class PostgresDbService implements DB {
  private pool: any;
  private configuration: DBConfig;

  constructor(configurationService: ConfigurationService) {
    this.configuration = configurationService.db();
    console.log('Creating pool with config: ', this.configuration);

    this.pool = new Pool({
      ...this.configuration,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async query(
      q: string,
      params?: any[],
      options = {skipLogging: false, skipLoggingResult: true},
  ): Promise<any[]> {
    if (!options.skipLogging) {
      console.log(`QUERY: ${q}`);
      console.log(`PARAMS: ${(params ?? []).join(', ')}`);
    }
    let res = await this.withConnection((client) => client.query(q, params));
    if (!options.skipLogging && !options.skipLoggingResult)
      console.log(`RESULT: ${JSON.stringify(res.rows)}`);
    return res.rows;
  }

  async withConnection(action: (connection) => any) {
    let client: any = null;
    let results;
    try {
      client = await this.pool.connect();
      const res = await action(client);
      results = res;
    } catch (e) {
      console.log('DB client error: ', e);
      throw e;
    } finally {
      if (client) client.release();
    }
    return results;
  }

  async checkDB() {
    const res = await this.query('SELECT version()');
    console.log('Postgres version: ', JSON.stringify(res));
  }
}
