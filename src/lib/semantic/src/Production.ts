export class Production {
  no: number;

  left: string;

  right: string[];

  select: Array<string>;

  public getError(): string {
    return null;
  }

  public getSolution(): string {
    return null;
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    let ret: string = this.left + " -->";
    if (this.right.length === 0) ret += " ξ";
    for (let i: number = 0; i < this.right.length; i++) {
      {
        ret += " " + this.right[i];
      }
    }
    return ret;
  }

  public getSelect(): Array<string> {
    return this.select;
  }

  public setSelect(select: Array<string>) {
    this.select = select;
  }

  public getNo(): number {
    return this.no;
  }

  public getLeft(): string {
    return this.left;
  }

  public getRight(): string[] {
    return this.right;
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null, null, null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
        this.right[4] = symbol5;
        this.right[5] = symbol6;
        this.right[6] = symbol7;
        this.right[7] = symbol8;
        this.right[8] = symbol9;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null, null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
        this.right[4] = symbol5;
        this.right[5] = symbol6;
        this.right[6] = symbol7;
        this.right[7] = symbol8;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
        this.right[4] = symbol5;
        this.right[5] = symbol6;
        this.right[6] = symbol7;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
        this.right[4] = symbol5;
        this.right[5] = symbol6;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
        this.right[4] = symbol5;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
        this.right[3] = symbol4;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
        this.right[2] = symbol3;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null, null];
        this.right[0] = symbol1;
        this.right[1] = symbol2;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [null];
        this.right[0] = symbol1;
      })();
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      (() => {
        this.no = no;
        this.left = left;
        this.right = [];
      })();
    } else if (
      no === undefined &&
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
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
      if (this.no === undefined) this.no = 0;
      if (this.left === undefined) this.left = null;
      if (this.right === undefined) this.right = null;
      if (this.select === undefined) this.select = null;
    } else throw new Error("invalid overload");
  }
}

// Production["__class"] = "Production";
