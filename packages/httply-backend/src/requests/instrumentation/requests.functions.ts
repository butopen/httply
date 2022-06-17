import { HttplyRequest, HttplyResponse } from '@butopen/httply-model'
import { collector, instrumentationRules } from '@butopen/notest-collector'
import { CryptService } from '../../shared/crypt/crypt.service'

export function instrument_requestHash() {
    return function instrumentation(r: HttplyRequest) {
        try {
            console.log("collecting execution of requestHash")
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'text',
                value: { content: 'CgpleHBvcnQgZnVuY3Rpb24gcmVxdWVzdEhhc2gocjogSHR0cGx5UmVxdWVzdCkgey8vY2hhbmdlcwogIGNvbnN0IGNvbnRlbnQgPSByLnVybCArIEpTT04uc3RyaW5naWZ5KHIub3B0aW9ucykgKyAoci5ib2R5IHx8ICcnKTsKICByZXR1cm4gY3MuaGFzaChjb250ZW50KTsKfQ==' },
                line: 0,
                function: 'requestHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: r },
                line: 376,
                function: 'requestHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const content = r.url + JSON.stringify(r.options) + (r.body || '');

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: content },
                line: 377,
                function: 'requestHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = cs.hash(content)

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'output',
                value: { content: output },
                line: 391,
                function: 'requestHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'exception',
                value: { content: error.message },
                line: 376,
                function: 'requestHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_requestHash() {
    return instrumentationRules.check({ path: 'src/requests/requests.functions', name: 'requestHash' })
}

export function instrument_responseHash() {
    return function instrumentation(r: HttplyResponse) {
        try {
            console.log("collecting execution of responseHash")
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'text',
                value: { content: 'CgpleHBvcnQgZnVuY3Rpb24gcmVzcG9uc2VIYXNoKHI6IEh0dHBseVJlc3BvbnNlKSB7Ly9jaGFuZ2VzCiAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHIuaGVhZGVycykgKyBKU09OLnN0cmluZ2lmeShyLmJvZHkpOwogIHJldHVybiBjcy5oYXNoKGNvbnRlbnQpOwp9' },
                line: 0,
                function: 'responseHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: r },
                line: 376,
                function: 'responseHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const content = JSON.stringify(r.headers) + JSON.stringify(r.body);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: content },
                line: 377,
                function: 'responseHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = cs.hash(content)

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'output',
                value: { content: output },
                line: 391,
                function: 'responseHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'exception',
                value: { content: error.message },
                line: 376,
                function: 'responseHash',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_responseHash() {
    return instrumentationRules.check({ path: 'src/requests/requests.functions', name: 'responseHash' })
}

export function instrument_requestMeta() {
    return function instrumentation(requestid: number, responseid: number, requestDate: Date, responseDate: Date, domain: string) {
        try {
            console.log("collecting execution of requestMeta")
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'text',
                value: { content: 'CgpleHBvcnQgZnVuY3Rpb24gcmVxdWVzdE1ldGEoCiAgcmVxdWVzdGlkOiBudW1iZXIsCiAgcmVzcG9uc2VpZDogbnVtYmVyLAogIHJlcXVlc3REYXRlOiBEYXRlLAogIHJlc3BvbnNlRGF0ZTogRGF0ZSwKICBkb21haW46IHN0cmluZywKKSB7Ly9jaGFuZ2VzCiAgY29uc3QgcnFpZCA9IGNzLmVuY29kZShyZXF1ZXN0aWQpOwogIGNvbnN0IHJzaWQgPSBjcy5lbmNvZGUocmVzcG9uc2VpZCk7CiAgcmV0dXJuIGAke3JxaWR9LiR7cnNpZH0uJHtyZXF1ZXN0RGF0ZS5nZXRUaW1lKCl9LiR7cmVzcG9uc2VEYXRlLmdldFRpbWUoKX0uJHtlbmNvZGVVUklDb21wb25lbnQoCiAgICBkb21haW4sCiAgKX1gOwp9' },
                line: 0,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: requestid },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: responseid },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: requestDate },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: responseDate },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: domain },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const rqid = cs.encode(requestid);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: rqid },
                line: 314,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const rsid = cs.encode(responseid);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: rsid },
                line: 328,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = `${rqid}.${rsid}.${requestDate.getTime()}.${responseDate.getTime()}.${encodeURIComponent(
                domain,
            )}`

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'output',
                value: { content: output },
                line: 342,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'exception',
                value: { content: error.message },
                line: 313,
                function: 'requestMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_requestMeta() {
    return instrumentationRules.check({ path: 'src/requests/requests.functions', name: 'requestMeta' })
}

export function instrument_requestFromMeta() {
    return function instrumentation(meta: string) {
        try {
            console.log("collecting execution of requestFromMeta")
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'text',
                value: { content: 'CgpleHBvcnQgZnVuY3Rpb24gcmVxdWVzdEZyb21NZXRhKG1ldGE6IHN0cmluZykgey8vY2hhbmdlcwogIGNvbnN0IHBhcnRzID0gbWV0YS5zcGxpdCgnLicpOwogIGNvbnN0IHJlcXVlc3RpZCA9IGNzLmRlY29kZShwYXJ0c1swXSk7CiAgY29uc3QgcmVzcG9uc2VpZCA9IGNzLmRlY29kZShwYXJ0c1sxXSk7CiAgY29uc3QgcmVxdWVzdERhdGUgPSBuZXcgRGF0ZSgpOwogIHJlcXVlc3REYXRlLnNldFRpbWUoK3BhcnRzWzJdKTsKICBjb25zdCByZXNwb25zZURhdGUgPSBuZXcgRGF0ZSgpOwogIHJlc3BvbnNlRGF0ZS5zZXRUaW1lKCtwYXJ0c1szXSk7CiAgY29uc3QgZG9tYWluID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzRdKTsKICByZXR1cm4gewogICAgcmVxdWVzdGlkLAogICAgcmVzcG9uc2VpZCwKICAgIHJlcXVlc3REYXRlLAogICAgcmVzcG9uc2VEYXRlLAogICAgZG9tYWluLAogIH07Cn0=' },
                line: 0,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'input',
                value: { content: meta },
                line: 295,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const parts = meta.split('.');

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: parts },
                line: 296,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const requestid = cs.decode(parts[0]);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: requestid },
                line: 310,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const responseid = cs.decode(parts[1]);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: responseid },
                line: 324,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const requestDate = new Date();

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: requestDate },
                line: 338,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            requestDate.setTime(+parts[2]);

            const responseDate = new Date();

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: responseDate },
                line: 353,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            responseDate.setTime(+parts[3]);

            const domain = decodeURIComponent(parts[4]);

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'variable',
                value: { content: domain },
                line: 368,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = {
                requestid,
                responseid,
                requestDate,
                responseDate,
                domain,
            }

            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'output',
                value: { content: output },
                line: 382,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'function',
                type: 'exception',
                value: { content: error.message },
                line: 295,
                function: 'requestFromMeta',
                file: 'src/requests/requests.functions.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_requestFromMeta() {
    return instrumentationRules.check({ path: 'src/requests/requests.functions', name: 'requestFromMeta' })
}
const cs = new CryptService();
