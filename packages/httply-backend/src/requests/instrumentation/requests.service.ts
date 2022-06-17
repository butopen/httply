import { collector, instrumentationRules } from '@butopen/notest-collector'
import { GdbTablesData, Hlrequest } from '../../generated/gdb-httply-test-tables'

export function instrument_RequestsService_save(RequestsService) {
    RequestsService.prototype.save = async function(this, r: Partial<Hlrequest>) {
        try {
            console.log("collecting execution of RequestService.save")
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'text',
                value: { content: 'CgogIGFzeW5jIHNhdmUocjogUGFydGlhbDxIbHJlcXVlc3Q+KSB7Ly9jaGFuZ2UgcwogICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5xdWVyeSgKICAgICAgYGluc2VydCBpbnRvICR7dGhpcy50YWJsZU5hbWV9IHZhbHVlcyhERUZBVUxULCQxLCQyLCQzLCQ0LCQ1LCQ2KSByZXR1cm5pbmcgcmVxdWVzdGlkYCwKICAgICAgW3IucGF0aCwgci5tZXRob2QsIHIuZG9tYWluLCByLmhhc2gsIHIuY29udGVudCwgbmV3IERhdGUoKV0sCiAgICApOwogICAgcmV0dXJuIHJlc3VsdFswXVsncmVxdWVzdGlkJ107CiAgfQ==' },
                line: -1,
                function: this.constructor.name + "." + 'save',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "parameters": [{ "name": "db", "type": "DB" }] }
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: r },
                line: 9,
                function: this.constructor.name + "." + 'save',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const result = await this.db.query(
                `insert into ${this.tableName} values(DEFAULT,$1,$2,$3,$4,$5,$6) returning requestid`,
                [r.path, r.method, r.domain, r.hash, r.content, new Date()],
            );

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: result },
                line: 10,
                function: this.constructor.name + "." + 'save',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "db", "method": "query", "asyncF": true }
            })
            const output = result[0]['requestid']

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'output',
                value: { content: output },
                line: 27,
                function: this.constructor.name + "." + 'save',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "", "method": "", "asyncF": false }
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'exception',
                value: { content: error.message },
                line: 9,
                function: this.constructor.name + "." + 'save',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_RequestsService_save() {
    return instrumentationRules.check({ path: 'src/requests/requests.service', name: 'RequestsService.save' })
}

export function instrument_RequestsService_findById(RequestsService) {
    RequestsService.prototype.findById = async function(this, requestid: number) {
        try {
            console.log("collecting execution of RequestService.findById")
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'text',
                value: { content: 'CgogIGFzeW5jIGZpbmRCeUlkKHJlcXVlc3RpZDogbnVtYmVyKSB7CiAgICBjb25zdCB7IGhscmVxdWVzdCB9ID0gR2RiVGFibGVzRGF0YTsKICAgIGNvbnN0IGZvdW5kID0gYXdhaXQgdGhpcy5kYi5xdWVyeSgKICAgICAgYHNlbGVjdCAqIGZyb20gJHtobHJlcXVlc3QudGFibGVOYW1lfSB3aGVyZSAke2hscmVxdWVzdC5yZXF1ZXN0aWR9ID0gJDFgLAogICAgICBbcmVxdWVzdGlkXSwKICAgICk7CiAgICByZXR1cm4gZm91bmRbMF07CiAgfQ==' },
                line: -1,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "parameters": [{ "name": "db", "type": "DB" }] }
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: requestid },
                line: 87,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const { hlrequest } = GdbTablesData;

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: { hlrequest } },
                line: 88,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "", "method": "", "asyncF": false }
            })

            const found = await this.db.query(
                `select * from ${hlrequest.tableName} where ${hlrequest.requestid} = $1`,
                [requestid],
            );

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: found },
                line: 102,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "db", "method": "query", "asyncF": true }
            })
            const output = found[0]

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'output',
                value: { content: output },
                line: 119,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "", "method": "", "asyncF": false }
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'exception',
                value: { content: error.message },
                line: 87,
                function: this.constructor.name + "." + 'findById',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_RequestsService_findById() {
    return instrumentationRules.check({ path: 'src/requests/requests.service', name: 'RequestsService.findById' })
}

export function instrument_RequestsService_findByHash(RequestsService) {
    RequestsService.prototype.findByHash = async function(this, hash: string) {
        try {
            console.log("collecting execution of RequestService.findByHash")
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'text',
                value: { content: 'CgogIGFzeW5jIGZpbmRCeUhhc2goaGFzaDogc3RyaW5nKSB7CiAgICBjb25zdCB7IGhscmVxdWVzdCB9ID0gR2RiVGFibGVzRGF0YTsKICAgIGNvbnN0IGZvdW5kID0gYXdhaXQgdGhpcy5kYi5xdWVyeSgKICAgICAgYHNlbGVjdCAqIGZyb20gJHtobHJlcXVlc3QudGFibGVOYW1lfSB3aGVyZSAke2hscmVxdWVzdC5oYXNofSA9ICQxYCwKICAgICAgW2hhc2hdLAogICAgKTsKICAgIHJldHVybiBmb3VuZFswXTsKICB9' },
                line: -1,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "parameters": [{ "name": "db", "type": "DB" }] }
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: hash },
                line: 178,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const { hlrequest } = GdbTablesData;

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: { hlrequest } },
                line: 179,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "", "method": "", "asyncF": false }
            })

            const found = await this.db.query(
                `select * from ${hlrequest.tableName} where ${hlrequest.hash} = $1`,
                [hash],
            );

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: found },
                line: 193,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "db", "method": "query", "asyncF": true }
            })
            const output = found[0]

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'output',
                value: { content: output },
                line: 210,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: { "service": "", "method": "", "asyncF": false }
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'exception',
                value: { content: error.message },
                line: 178,
                function: this.constructor.name + "." + 'findByHash',
                file: 'src/requests/requests.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_RequestsService_findByHash() {
    return instrumentationRules.check({ path: 'src/requests/requests.service', name: 'RequestsService.findByHash' })
}
