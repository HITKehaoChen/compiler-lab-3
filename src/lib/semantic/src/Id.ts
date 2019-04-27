/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
export class Id {
  name: string;

  type: string;

  offset: number;

  length: number;

  public arr_list: Array<number>;

  public constructor(
    name: string,
    type: string,
    offset: number,
    length: number
  ) {
    if (this.name === undefined) this.name = null;
    if (this.type === undefined) this.type = null;
    if (this.offset === undefined) this.offset = 0;
    if (this.length === undefined) this.length = 0;
    if (this.arr_list === undefined) this.arr_list = null;
    this.name = name;
    this.type = type;
    this.offset = offset; //起始地址
    this.length = length; //长度
    this.arr_list = <any>[];
  }

  public getName(): string {
    return this.name;
  }

  public getType(): string {
    return this.type;
  }

  public getOffset(): number {
    return this.offset;
  }

  public getLength(): number {
    return this.length;
  }
}
