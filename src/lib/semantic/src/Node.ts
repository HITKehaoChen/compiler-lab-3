export class Node {
  symbolName: string;

  father: Node;

  public sons: Array<Node>;

  public attribute: any;

  public constructor(symbolName: string, father: Node) {
    if (this.symbolName === undefined) this.symbolName = null;
    if (this.father === undefined) this.father = null;
    if (this.sons === undefined) this.sons = null;
    if (this.attribute === undefined) this.attribute = null;
    this.symbolName = symbolName;
    this.father = father;
    this.sons = <any>[];
    this.attribute = <any>{};
  }

  public setSons(sons: Array<Node>) {
    this.sons = sons;
  }

  public getSymbolName(): string {
    return this.symbolName;
  }

  public getFather(): Node {
    return this.father;
  }
}
