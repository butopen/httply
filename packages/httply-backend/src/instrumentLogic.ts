import {RequestsService} from './requests/requests.service'
import {instrument_RequestsService_findByHash,useInstrumented_RequestsService_findByHash} from './requests/instrumentation/requests.service'
import {instrument_RequestsService_findById,useInstrumented_RequestsService_findById} from './requests/instrumentation/requests.service'
import {instrument_RequestsService_save,useInstrumented_RequestsService_save} from './requests/instrumentation/requests.service'
import {CryptService} from './shared/crypt/crypt.service'
import {instrument_CryptService_hash,useInstrumented_CryptService_hash} from './shared/crypt/instrumentation/crypt.service'
import {instrument_CryptService_encode,useInstrumented_CryptService_encode} from './shared/crypt/instrumentation/crypt.service'
/* decorated by notest... just ignore -> */if(useInstrumented_CryptService_encode()){instrument_CryptService_encode(CryptService)}
/* decorated by notest... just ignore -> */if(useInstrumented_CryptService_hash()){instrument_CryptService_hash(CryptService)}
/* decorated by notest... just ignore -> */if(useInstrumented_RequestsService_findByHash()){instrument_RequestsService_findByHash(RequestsService)}
