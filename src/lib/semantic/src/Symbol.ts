export class Symbol {
  no: number;

  /*private*/
  name: string;

  /*private*/
  type: string; //N代表非终结符，T代表终结符

  /*private*/
  higher_name: string;

  public first: Array<string>;

  public follow: Array<string>;

  public constructor(no?: any, name?: any, type?: any, higher_name?: any) {
    if (
      (typeof no === "number" || no === null) &&
      (typeof name === "string" || name === null) &&
      (typeof type === "string" || type === null) &&
      (typeof higher_name === "string" || higher_name === null)
    ) {
      {
        if (this.no === undefined) this.no = 0;
        if (this.name === undefined) this.name = null;
        if (this.type === undefined) this.type = null;
        if (this.higher_name === undefined) this.higher_name = null;
        if (this.first === undefined) this.first = null;
        if (this.follow === undefined) this.follow = null;
        if (this.no === undefined) this.no = 0;
        if (this.name === undefined) this.name = null;
        if (this.type === undefined) this.type = null;
        if (this.higher_name === undefined) this.higher_name = null;
        if (this.first === undefined) this.first = null;
        if (this.follow === undefined) this.follow = null;
        (() => {
          this.no = no;
          this.name = name;
          this.type = type;
          this.first = <any>[];
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(type) ===
            "N".charCodeAt(0)
          ) {
            this.follow = <any>[];
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(type) ===
            "T".charCodeAt(0)
          ) {
            this.first.push(name);
            this.follow = null;
          } else {
            throw new Error("非法的符号类型");
          }
        })();
      }
      (() => {
        this.higher_name = higher_name;
      })();
    } else if (
      (typeof no === "number" || no === null) &&
      (typeof name === "string" || name === null) &&
      (typeof type === "string" || type === null) &&
      higher_name === undefined
    ) {
      if (this.no === undefined) this.no = 0;
      if (this.name === undefined) this.name = null;
      if (this.type === undefined) this.type = null;
      if (this.higher_name === undefined) this.higher_name = null;
      if (this.first === undefined) this.first = null;
      if (this.follow === undefined) this.follow = null;
      if (this.no === undefined) this.no = 0;
      if (this.name === undefined) this.name = null;
      if (this.type === undefined) this.type = null;
      if (this.higher_name === undefined) this.higher_name = null;
      if (this.first === undefined) this.first = null;
      if (this.follow === undefined) this.follow = null;
      (() => {
        this.no = no;
        this.name = name;
        this.type = type;
        this.first = <any>[];
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(type) ===
          "N".charCodeAt(0)
        ) {
          this.follow = <any>[];
        } else if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(type) ===
          "T".charCodeAt(0)
        ) {
          /* add */
          this.first.push(name);
          this.follow = null;
        } else {
          throw new Error("非法的符号类型");
        }
      })();
    } else throw new Error("invalid overload");
  }

  public getName(): string {
    return this.name;
  }

  public isTerminal(): boolean {
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(this.type) ===
      "N".charCodeAt(0)
    )
      return false;
    else return true;
  }

  public has(arr_name: string, sym_name: string): boolean {
    let arr: Array<string> = null;
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(arr_name.toUpperCase(), "FIRST")) arr = this.first;
    else if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(arr_name.toUpperCase(), "FOLLOW")) arr = this.follow;
    else throw new Error("非法的集合名");
    for (let i: number = 0; i < <number>arr.length; i++) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(arr[i], sym_name)) return true;
      }
    }
    return false;
  }
}
