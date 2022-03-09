import { HttplyRequest, HttplyResponse } from '@butopen/httply-model';
import { CryptService } from '../shared/crypt/crypt.service';

const cs = new CryptService();

export function requestHash(r: HttplyRequest) {
  const content = r.url + JSON.stringify(r.options) + (r.body || '');
  return cs.hash(content);
}

export function responseHash(r: HttplyResponse) {
  const content = JSON.stringify(r.headers) + JSON.stringify(r.body);
  return cs.hash(content);
}

export function requestMeta(
  requestid: number,
  responseid: number,
  requestDate: Date,
  responseDate: Date,
  domain: string,
) {
  const rqid = cs.encode(requestid);
  const rsid = cs.encode(responseid);
  return `${rqid}.${rsid}.${requestDate.getTime()}.${responseDate.getTime()}.${encodeURIComponent(
    domain,
  )}`;
}

export function requestFromMeta(meta: string) {
  const parts = meta.split('.');
  const requestid = cs.decode(parts[0]);
  const responseid = cs.decode(parts[1]);
  const requestDate = new Date();
  requestDate.setTime(+parts[2]);
  const responseDate = new Date();
  responseDate.setTime(+parts[3]);
  const domain = decodeURIComponent(parts[4]);
  return {
    requestid,
    responseid,
    requestDate,
    responseDate,
    domain,
  };
}
