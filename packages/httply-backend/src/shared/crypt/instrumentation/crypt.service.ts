import { collector, instrumentationRules } from '@butopen/notest-collector'
export function instrument_CryptService_encode(CryptService) {
    CryptService.prototype.encode = function(this, input: number) {
        try {
            console.log("collecting execution of CryptService.encode")
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'text',
                value: { content: 'CgogIC8qKgogICAqIEVuY29kZXMgYSBudW1iZXIgdG8gc3RyaW5nLiBFeC4gdG8gaGlkZSB0aGUgaWQgb2YgdXNlcnMKICAgKiBAcGFyYW0gaW5wdXQKICAgKi8KICBlbmNvZGUoaW5wdXQ6IG51bWJlcik6IHN0cmluZyB7Ly9jaGFuZ2VzCiAgICByZXR1cm4gdGhpcy5oYXNoaWQuZW5jb2RlKGlucHV0KTsKICB9' },
                line: 0,
                function: this.constructor.name + "." + 'encode',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: input },
                line: 6,
                function: this.constructor.name + "." + 'encode',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = this.hashid.encode(input)

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'output',
                value: { content: output },
                line: 7,
                function: this.constructor.name + "." + 'encode',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'exception',
                value: { content: error.message },
                line: 6,
                function: this.constructor.name + "." + 'encode',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_CryptService_encode() {
    return instrumentationRules.check({ path: 'src/shared/crypt/crypt.service', name: 'CryptService.encode' })
}

export function instrument_CryptService_hash(CryptService) {
    CryptService.prototype.hash = function(this, rawPassword: string, secret: string) {
        try {
            console.log("collecting execution of CryptService.hash")
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'text',
                value: { content: 'CgogIC8qKgogICAqCiAgICogQHBhcmFtIHJhd1Bhc3N3b3JkCiAgICogQHBhcmFtIHNlY3JldCAob3B0aW9uYWwpCiAgICoKICAgKiBAZXhhbXBsZQogICAqCiAgICogLy8gcmV0dXJucyB0aGUgaGFzaGVkIHBhc3N3b3JkCiAgICogY29uc3QgaGFzaCA9IGNyeXB0U2VydmljZS5oYXNoKCJteS1wd2QiKQogICAqLwogIGhhc2gocmF3UGFzc3dvcmQ6IHN0cmluZywgc2VjcmV0OiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7Ly9jaGFuIGdlcwogICAgY29uc3QgcyA9IHNlY3JldCB8fCB0aGlzLnNlY3JldDsKICAgIHJldHVybiBzaGE1MTIocmF3UGFzc3dvcmQgKyBzKTsKICB9' },
                line: 0,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: rawPassword },
                line: 67,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'input',
                value: { content: secret },
                line: 67,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })

            const s = secret || this.secret;

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'variable',
                value: { content: s },
                line: 68,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            const output = sha512(rawPassword + s)

            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'output',
                value: { content: output },
                line: 82,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return output
        } catch (error: any) {
            collector.collect({
                project: 'httply-backend',
                script: 'method',
                type: 'exception',
                value: { content: error.message },
                line: 67,
                function: this.constructor.name + "." + 'hash',
                file: 'src/shared/crypt/crypt.service.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_CryptService_hash() {
    return instrumentationRules.check({ path: 'src/shared/crypt/crypt.service', name: 'CryptService.hash' })
}
const sha512 = require('js-sha512');
