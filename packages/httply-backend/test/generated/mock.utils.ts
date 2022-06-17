export const createMockProxy = <T>() => {
  const cache = new Map<any, jest.Mock>();
  const handler: ProxyHandler<object> = {
    get: (_, name) => {
      if (name === 'mockClear') {
        return () => cache.clear();
      }

      if (!cache.has(name)) {
        cache.set(name, jest.fn());
      }

      return cache.get(name);
    },
  };
  return new Proxy({}, handler) as jest.Mocked<T> & { mockClear(): void };
};