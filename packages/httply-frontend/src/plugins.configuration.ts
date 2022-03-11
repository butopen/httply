import { FetchParser, HttpParser } from '@butopen/httply-plugins';

export const httpParsers = [new FetchParser(), new HttpParser()];
