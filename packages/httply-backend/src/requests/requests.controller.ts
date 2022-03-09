import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ResponsesService } from './responses.service';
import { RequestHitsService } from './request-hits.service';
import { ResponseHitsService } from './response-hits.service';
import {
  HttplyEvent,
  HttplyRequest,
  HttplyResponse,
} from '@butopen/httply-model';
import { parse } from 'url';
import {
  requestFromMeta,
  requestHash,
  requestMeta,
  responseHash,
} from './requests.functions';

@Controller('request')
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private responsesService: ResponsesService,
    private requestHitsService: RequestHitsService,
    private responseHitsService: ResponseHitsService,
  ) {}

  @Get(':meta')
  async loadRequest(@Param('meta') meta): Promise<HttplyEvent> {
    const reqMeta = requestFromMeta(meta);
    const rawRequest = await this.requestsService.findById(reqMeta.requestid);
    const request = rawRequest.content as HttplyRequest;
    request.timestamp = reqMeta.requestDate.getTime();
    const rawResponse = await this.responsesService.findById(
      reqMeta.responseid,
    );
    const response = rawResponse.content as HttplyResponse;
    response.timestamp = reqMeta.responseDate.getTime();
    console.log('response: ', response);
    return { request, response, domain: reqMeta.domain };
  }

  @Post()
  async saveRequest(@Body() requestEvent: HttplyEvent) {
    const req = requestEvent.request;
    const url = parse(req.url, true);
    const reqHash = requestHash(req);
    const foundReq = await this.requestsService.findByHash(reqHash);
    let requestid;
    if (!foundReq) {
      requestid = await this.requestsService.save({
        domain: requestEvent.domain,
        hash: reqHash,
        content: req,
        method: req.options.method,
        path: url.pathname,
      });
    } else requestid = foundReq.requestid;
    const reqHitDate = await this.requestHitsService.save(requestid);
    const resp = requestEvent.response;
    const respHash = responseHash(resp);
    let responseid;
    const foundResp = await this.responsesService.findByHash(reqHash);
    if (!foundResp) {
      responseid = await this.responsesService.save({
        hash: respHash,
        content: resp,
        requestid,
      });
    } else responseid = foundResp.responseid;
    const respHitDate = await this.responseHitsService.save(requestid);
    const meta = requestMeta(
      requestid,
      responseid,
      reqHitDate,
      respHitDate,
      requestEvent.domain,
    );
    return { meta };
  }
}
