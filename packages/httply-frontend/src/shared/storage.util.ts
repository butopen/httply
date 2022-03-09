interface StorageState<T> {
  local: T;
  session: T;
}

export class PersistentStorage<T> {
  constructor(private name: string, private version = 1) {}

  withStorage<X = void | T>(action: (s: StorageState<T>) => X): X {
    let s = { local: this.local(), session: this.session() };
    let result = action(s);
    localStorage.setItem(this.name, JSON.stringify(s.local));
    sessionStorage.setItem(this.name, JSON.stringify(s.session));
    return result;
  }

  local(): T {
    return JSON.parse(localStorage.getItem(this.name) ?? JSON.stringify({ version: this.version }));
  }

  session(): T {
    return JSON.parse(sessionStorage.getItem(this.name) ?? '{}');
  }
}
