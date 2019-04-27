import { Production } from "./Production";

export class ErrorProduction extends Production {
  error: string;

  solution: string;

  public getError(): string {
    return this.error;
  }

  public setError(error: string) {
    this.error = error;
  }

  public getSolution(): string {
    return this.solution;
  }

  public setSolution(solution: string) {
    this.solution = solution;
  }

  public constructor(
    no?: any,
    left?: any,
    symbol1?: any,
    symbol2?: any,
    symbol3?: any,
    symbol4?: any,
    symbol5?: any,
    symbol6?: any,
    symbol7?: any,
    symbol8?: any,
    symbol9?: any
  ) {
    if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      (typeof symbol5 === "string" || symbol5 === null) &&
      (typeof symbol6 === "string" || symbol6 === null) &&
      (typeof symbol7 === "string" || symbol7 === null) &&
      (typeof symbol8 === "string" || symbol8 === null) &&
      (typeof symbol9 === "string" || symbol9 === null)
    ) {
      super(
        no,
        left,
        symbol1,
        symbol2,
        symbol3,
        symbol4,
        symbol5,
        symbol6,
        symbol7,
        symbol8,
        symbol9
      );
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      (typeof symbol5 === "string" || symbol5 === null) &&
      (typeof symbol6 === "string" || symbol6 === null) &&
      (typeof symbol7 === "string" || symbol7 === null) &&
      (typeof symbol8 === "string" || symbol8 === null) &&
      symbol9 === undefined
    ) {
      super(
        no,
        left,
        symbol1,
        symbol2,
        symbol3,
        symbol4,
        symbol5,
        symbol6,
        symbol7,
        symbol8
      );
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      (typeof symbol5 === "string" || symbol5 === null) &&
      (typeof symbol6 === "string" || symbol6 === null) &&
      (typeof symbol7 === "string" || symbol7 === null) &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(
        no,
        left,
        symbol1,
        symbol2,
        symbol3,
        symbol4,
        symbol5,
        symbol6,
        symbol7
      );
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      (typeof symbol5 === "string" || symbol5 === null) &&
      (typeof symbol6 === "string" || symbol6 === null) &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1, symbol2, symbol3, symbol4, symbol5, symbol6);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      (typeof symbol5 === "string" || symbol5 === null) &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1, symbol2, symbol3, symbol4, symbol5);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      (typeof symbol4 === "string" || symbol4 === null) &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1, symbol2, symbol3, symbol4);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      (typeof symbol3 === "string" || symbol3 === null) &&
      symbol4 === undefined &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1, symbol2, symbol3);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      (typeof symbol2 === "string" || symbol2 === null) &&
      symbol3 === undefined &&
      symbol4 === undefined &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1, symbol2);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      (typeof symbol1 === "string" || symbol1 === null) &&
      symbol2 === undefined &&
      symbol3 === undefined &&
      symbol4 === undefined &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left, symbol1);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof left === "string" || left === null) &&
      symbol1 === undefined &&
      symbol2 === undefined &&
      symbol3 === undefined &&
      symbol4 === undefined &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      super(no, left);
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
    } else if (
      ((no != null && no instanceof <any>Production) || no === null) &&
      left === undefined &&
      symbol1 === undefined &&
      symbol2 === undefined &&
      symbol3 === undefined &&
      symbol4 === undefined &&
      symbol5 === undefined &&
      symbol6 === undefined &&
      symbol7 === undefined &&
      symbol8 === undefined &&
      symbol9 === undefined
    ) {
      let __args = arguments;
      let father: any = __args[0];
      super();
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      if (this.error === undefined) this.error = null;
      if (this.solution === undefined) this.solution = null;
      (() => {
        this.no = father.no;
        this.left = father.left;
        this.right = father.right;
      })();
    } else throw new Error("invalid overload");
  }
}

ErrorProduction["__class"] = "ErrorProduction";
