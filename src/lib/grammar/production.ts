export class Production {
  private _left: string;
  private _right: string[];

  public select: string[] = [];

  constructor(left: string, right: string[]) {
    this._left = left;
    this._right = right;
  }

  left(): string {
    return this._left;
  }

  rights(): string[] {
    return this._right;
  }
}
