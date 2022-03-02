import type {Json} from '../../shared/json.model';

export interface RenderedJsonRow {
    jsonType:
        | string
        | 'undefined'
        | 'object'
        | 'boolean'
        | 'number'
        | 'string'
        | 'function'
        | 'symbol'
        | 'bigint';
    expanded: boolean;
    key: string;
    value: string;
    tooltip: string | null;
    json: Json;
}

export class JsonViewerLogic {
  toRenderedValues(json: Json) {
    let keys = Object.keys(json as any);
    let keyRows = keys.map((k, i) => {
      let jsonValue = this.value(json[k]);
      let jsonType = this.jsonType(jsonValue);
      let r: RenderedJsonRow = {
        key: k,
        json: jsonValue,
        tooltip: this.renderTooltip(jsonValue),
        value: this.renderValue(jsonValue),
        expanded: false,
          jsonType
      };
      return r;
    });
    return keyRows;
  }

  private renderValue(json: Json) {
    if (this.isPrimitive(json)) return json as any;
    else {
        let prefix = '';
      if (Array.isArray(json)) prefix = `Array(${json.length}) `;
      return prefix + JSON.stringify(json);
    }
  }

  private renderTooltip(json: Json) {
    if (this.isPrimitive(json)) return null;
    else {
      return JSON.stringify(json);
    }
  }

  private jsonType(obj) {
      return obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj;
  }

  private isPrimitive(obj) {
    return obj !== Object(obj);
  }

  private value(value: any) {
    if (!value) return value;
    let json;
      if (value.constructor === [].constructor || value.constructor === {}.constructor) {
          return value;
      }

    try {
        json = JSON.parse(atob(value.split('.')[1]));
    } catch (e) {}
    if (!json) {
      try {
        json = JSON.parse(value);
      } catch (e) {}
    }
    if (!json) {
      try {
        json = JSON.parse(atob(value));
      } catch (e) {}
    }
    return json || value;
  }
}
