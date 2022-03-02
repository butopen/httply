import type { HttplyRequest } from './httply.model';

function fetchExtractor(url, options) {
  return { url, options };
}

export function fetchParser(requestText: string): HttplyRequest {
  if (requestText.startsWith('http')) {
    return {
      url: requestText,
      options: {
        method: 'GET'
      }
    };
  }
  if (requestText.includes('fetch')) {
    try {
      let { url, options } = new Function('fetch', `return ${requestText}`)(fetchExtractor);
      if (!options) options = { method: 'GET' };
      return { url, options };
    } catch (e) {
      console.error(e);
    }
  }
  return;
}
