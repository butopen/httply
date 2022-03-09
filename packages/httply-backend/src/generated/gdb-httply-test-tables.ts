/**
 * AUTO-GENERATED FILE @ Tue, 08 Mar 2022 14:41:34 GMT
 */

export interface Hlresponsehit {
  responsehitid: number;
  responseid?: number | null;
  date?: Date | null;
}

export interface Hlrequesthit {
  requesthitid: number;
  requestid?: number | null;
  date?: Date | null;
}

export interface Hlrequest {
  requestid: number;
  path?: string | null;
  method?: string | null;
  domain?: string | null;
  hash?: string | null;
  content?: unknown | null;
  created?: Date | null;
}

export interface Hlresponse {
  responseid: number;
  requestid?: number | null;
  hash?: string | null;
  content?: unknown | null;
  created?: Date | null;
}

export interface GdbTables {
  hlresponsehit: Hlresponsehit;
  hlrequesthit: Hlrequesthit;
  hlrequest: Hlrequest;
  hlresponse: Hlresponse;
}

export const GdbTablesData = {
  tableNames: {
    hlresponsehit: 'hlresponsehit',
    hlrequesthit: 'hlrequesthit',
    hlrequest: 'hlrequest',
    hlresponse: 'hlresponse',
  },
  hlresponsehit: {
    tableName: 'hlresponsehit',
    responsehitid: 'hlresponsehit.responsehitid',
    responseid: 'hlresponsehit.responseid',
    date: 'hlresponsehit.date',
  },
  hlrequesthit: {
    tableName: 'hlrequesthit',
    requesthitid: 'hlrequesthit.requesthitid',
    requestid: 'hlrequesthit.requestid',
    date: 'hlrequesthit.date',
  },
  hlrequest: {
    tableName: 'hlrequest',
    requestid: 'hlrequest.requestid',
    path: 'hlrequest.path',
    method: 'hlrequest.method',
    domain: 'hlrequest.domain',
    hash: 'hlrequest.hash',
    content: 'hlrequest.content',
    created: 'hlrequest.created',
  },
  hlresponse: {
    tableName: 'hlresponse',
    responseid: 'hlresponse.responseid',
    requestid: 'hlresponse.requestid',
    hash: 'hlresponse.hash',
    content: 'hlresponse.content',
    created: 'hlresponse.created',
  },
};
