import type { HttplyRequest } from './httply.model';

function fetchExtractor(url, options) {
  return { url, options };
}

export function fetchParser(requestText: string): HttplyRequest {
  const timestamp = new Date().getTime();
  if (requestText.startsWith('http')) {
    return {
      url: requestText,
      timestamp,
      options: {
        method: 'GET'
      }
    };
  }
  if (requestText.includes('fetch')) {
    try {
      let { url, options } = new Function('fetch', `return ${requestText}`)(fetchExtractor);
      if (!options) options = { method: 'GET' };
      return { url, options, timestamp };
    } catch (e) {
      console.error(e);
    }
  }
  return;
}
