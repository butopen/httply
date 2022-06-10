import { collector, instrumentationRules } from '@butopen/notest-collector'
import { loggedWritable } from '../../shared/store.util'
import type { HttplyRequest } from '@butopen/httply-model';
export function instrument_updateShareLink() {
    return function instrumentation(request: HttplyRequest, meta: string) {
        try {
            collector.collect({
                project: 'httply-frontend',
                script: 'function',
                type: 'text',
                value: { content: 'CgpleHBvcnQgZnVuY3Rpb24gdXBkYXRlU2hhcmVMaW5rKHJlcXVlc3Q6IEh0dHBseVJlcXVlc3QsIG1ldGE6IHN0cmluZykgeyAKICB2aWV3U3RvcmUudXBkYXRlKHsKICAgIHNoYXJlTGluazogYGh0dHBzOi8vaHR0cGx5LmNvbS9oLyR7bWV0YX0vJHtyZXF1ZXN0Lm9wdGlvbnMubWV0aG9kfS0ke3JlcXVlc3QudXJsCiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKQogICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKX1gCiAgfSk7Cn0=' },
                line: 0,
                function: 'updateShareLink',
                file: 'src/stores/view.store.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-frontend',
                script: 'function',
                type: 'input',
                value: { content: meta },
                line: 7,
                function: 'updateShareLink',
                file: 'src/stores/view.store.ts',
                timestamp: Date.now(),
                other: undefined
            })
            collector.collect({
                project: 'httply-frontend',
                script: 'function',
                type: 'input',
                value: { content: request },
                line: 7,
                function: 'updateShareLink',
                file: 'src/stores/view.store.ts',
                timestamp: Date.now(),
                other: undefined
            })
            viewStore.update({
                shareLink: `https://httply.com/h/${meta}/${request.options.method}-${request.url
                    .replace('https://', '')
                    .replace('http://', '')}`
            });
        } catch (error: any) {
            collector.collect({
                project: 'httply-frontend',
                script: 'function',
                type: 'exception',
                value: { content: error.message },
                line: 7,
                function: 'updateShareLink',
                file: 'src/stores/view.store.ts',
                timestamp: Date.now(),
                other: undefined
            })
            return error
        }
    }
}

export function useInstrumented_updateShareLink() {
    return instrumentationRules.check({ path: 'src/stores/view.store', name: 'updateShareLink' })
}
export interface ViewState {
    sectionExpanded: {
        General: boolean;
        Payload: boolean;
        RequestHeaders: boolean;
        ResponseHeaders: boolean;
        Request: boolean;
        Response: boolean;
        Authorization: boolean;
    };
    request: {
        information: {
            Url?: string;
            Method?: string;
            Domain?: string;
            'Request Timestamp'?: string;
            'Response Timestamp'?: string;
            Referrer?: string;
        };
        headers?: { [h: string]: string };
        body?: any;
    };
    response?: {
        headers: { [h: string]: string };
        body: any;
    };
    shareLink?: string;
}
const sections = {
    General: true,
    Payload: false,
    Request: false,
    RequestHeaders: false,
    ResponseHeaders: false,
    Response: false,
    Authorization: false
};
export const viewStore = loggedWritable<ViewState>({
    request: { information: {} },
    sectionExpanded: sections
});
