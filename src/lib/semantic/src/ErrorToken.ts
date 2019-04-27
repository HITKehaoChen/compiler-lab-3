/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */

import { Token } from "./Token";

export class ErrorToken extends Token {
  public constructor(name?: any, value?: any, source?: any) {
    if (
      (typeof name === "string" || name === null) &&
      (typeof value === "string" || value === null) &&
      (typeof source === "string" || source === null)
    ) {
      super(name, source);
      (() => {
        this.value = value;
      })();
    } else if (
      (typeof name === "string" || name === null) &&
      (typeof value === "string" || value === null) &&
      source === undefined
    ) {
      let __args = arguments;
      let source: any = __args[1];
      super(name, source);
    } else throw new Error("invalid overload");
  }
}

// ErrorToken['__class'] = 'ErrorToken';
// ErrorToken['__interfaces'] = ['java.lang.Cloneable'];
