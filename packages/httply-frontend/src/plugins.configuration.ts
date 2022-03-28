import { CurlParser, FetchParser, HttpParser } from '@butopen/httply-plugins';

export const httpParsers = [new FetchParser(), /*new CurlParser(),*/ new HttpParser()];
