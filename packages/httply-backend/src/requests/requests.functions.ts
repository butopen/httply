import {instrument_requestFromMeta,useInstrumented_requestFromMeta} from './instrumentation/requests.functions'
/* decorated by notest... just ignore -> */if(useInstrumented_requestFromMeta()){(requestFromMeta as any) =  instrument_requestFromMeta()}
import {instrument_requestMeta,useInstrumented_requestMeta} from './instrumentation/requests.functions'
/* decorated by notest... just ignore -> */if(useInstrumented_requestMeta()){(requestMeta as any) =  instrument_requestMeta()}
import {instrument_responseHash,useInstrumented_responseHash} from './instrumentation/requests.functions'
/* decorated by notest... just ignore -> */if(useInstrumented_responseHash()){(responseHash as any) =  instrument_responseHash()}
import {instrument_requestHash,useInstrumented_requestHash} from './instrumentation/requests.functions'
/* decorated by notest... just ignore -> */if(useInstrumented_requestHash()){(requestHash as any) =  instrument_requestHash()}
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
