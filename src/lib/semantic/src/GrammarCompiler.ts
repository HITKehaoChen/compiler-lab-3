/* eslint-disable @typescript-eslint/camelcase,prettier/prettier,@typescript-eslint/no-explicit-any,@typescript-eslint/explicit-member-accessibility,@typescript-eslint/no-angle-bracket-type-assertion,@typescript-eslint/ban-types,@typescript-eslint/explicit-function-return-type */
import { Production } from "./Production";
import { Node } from "./Node";
import { Symbol } from "./Symbol";
import { ErrorProduction } from "./ErrorProduction";
import { Token } from "./Token";
import { Id } from "./Id";

export class GrammarCompiler {
  productions: Array<Production>;

  symbols: Array<Symbol>;

  ids: Array<Id>; //标识符表

  codes: Array<string>; //三地址码

  public getIds(): Array<Id> {
    return this.ids;
  }

  public getCodes(): Array<string> {
    return this.codes;
  }

  public constructor() {
    if (this.productions === undefined) this.productions = null;
    if (this.symbols === undefined) this.symbols = null;
    if (this.ids === undefined) this.ids = null;
    if (this.codes === undefined) this.codes = null;
    this.ids = <any>[];
    this.codes = <any>[];
    this.symbols = <any>[];
    this.productions = <any>[];
    this.CreateNewProduction();
    this.getFirst();
    this.getFollow();
    this.getSelect();
  }

  public CreateNewProduction() {
    this.productions.push(new Production(0, "S", "func", "S"));
    this.productions.push(new Production(1, "S"));
    this.productions.push(
      new Production(2, "func", "type", "id", "(", "params", ")", "func_body")
    );
    this.productions.push(
      new Production(3, "func", "VOID", "id", "(", "params", ")", "func_body")
    );
    this.productions.push(new Production(4, "params"));
    this.productions.push(new Production(5, "params", "type", "id", "params'"));
    this.productions.push(new Production(6, "params'"));
    this.productions.push(
      new Production(7, "params'", ",", "type", "id", "params'")
    );
    this.productions.push(new Production(8, "func_body", ";"));
    this.productions.push(new Production(9, "func_body", "block"));
    this.productions.push(
      new Production(10, "block", "{", "def_stmts", "stmts", "}")
    );
    this.productions.push(
      new Production(11, "def_stmts", "def_stmt", "def_stmts")
    );
    this.productions.push(new Production(12, "def_stmts"));
    this.productions.push(
      new Production(
        13,
        "def_stmt",
        "type",
        "id",
        "M13_2",
        "array",
        "M13_4",
        "vars",
        ";"
      )
    );
    this.productions.push(new Production(13, "M13_2"));
    this.symbols.push(new Symbol(-1, "M13_2", "N"));
    this.productions.push(new Production(13, "M13_4"));
    this.symbols.push(new Symbol(-1, "M13_4", "N"));
    this.productions.push(new Production(14, "array", "M14_1"));
    this.productions.push(new Production(14, "M14_1"));
    this.symbols.push(new Symbol(-1, "M14_1", "N"));
    this.productions.push(
      new Production(15, "array", "[", "int", "]", "M15_4", "array", "M15_6")
    );
    this.productions.push(new Production(15, "M15_4"));
    this.symbols.push(new Symbol(-1, "M15_4", "N"));
    this.productions.push(new Production(15, "M15_6"));
    this.symbols.push(new Symbol(-1, "M15_6", "N"));
    this.productions.push(new Production(16, "vars"));
    this.productions.push(
      new Production(17, "vars", ",", "id", "M17_3", "array", "M17_5", "vars")
    );
    this.productions.push(new Production(17, "M17_3"));
    this.symbols.push(new Symbol(-1, "M17_3", "N"));
    this.productions.push(new Production(17, "M17_5"));
    this.symbols.push(new Symbol(-1, "M17_5", "N"));
    this.productions.push(new Production(18, "stmts"));
    this.productions.push(new Production(19, "stmts", "stmt", "stmts"));
    this.productions.push(new Production(20, "stmt", "E", ";"));
    this.productions.push(new Production(21, "stmt", ";"));
    this.productions.push(new Production(22, "stmt", "block"));
    this.productions.push(new Production(23, "stmt", "RETURN", "e", ";"));
    this.productions.push(new Production(24, "stmt", "CONTINUE", ";"));
    this.productions.push(new Production(25, "stmt", "BREAK", ";"));
    this.productions.push(
      new Production(
        26,
        "stmt",
        "IF",
        "(",
        "E",
        ")",
        "M26_5",
        "stmt",
        "M26_7",
        "else",
        "M26_9"
      )
    );
    this.productions.push(new Production(26, "M26_5"));
    this.symbols.push(new Symbol(-1, "M26_5", "N"));
    this.productions.push(new Production(26, "M26_7"));
    this.symbols.push(new Symbol(-1, "M26_7", "N"));
    this.productions.push(new Production(26, "M26_9"));
    this.symbols.push(new Symbol(-1, "M26_9", "N"));
    this.productions.push(
      new Production(27, "stmt", "SWITCH", "(", "E", ")", "{", "cases", "}")
    );
    this.productions.push(
      new Production(28, "stmt", "DO", "stmt", "WHILE", "(", "E", ")", ";")
    );
    this.productions.push(new Production(30, "else", "ELSE", "stmt"));
    this.productions.push(new Production(29, "else"));
    this.productions.push(new Production(31, "cases", "case", "cases"));
    this.productions.push(new Production(32, "cases"));
    this.productions.push(
      new Production(33, "case", "CASE", "const", ":", "stmts")
    );
    this.productions.push(new Production(34, "case", "DEFAULT", ":", "stmts"));
    this.productions.push(new Production(35, "e"));
    this.productions.push(new Production(36, "e", "E"));
    this.productions.push(
      new Production(
        37,
        "stmt",
        "FOR",
        "(",
        "e",
        ";",
        "e",
        ";",
        "e",
        ")",
        "stmt"
      )
    );
    this.productions.push(
      new Production(
        38,
        "stmt",
        "WHILE",
        "(",
        "M38_3",
        "E",
        ")",
        "M26_5",
        "stmt",
        "M38_7"
      )
    );
    this.productions.push(new Production(38, "M38_3"));
    this.symbols.push(new Symbol(-1, "M38_3", "N"));
    this.productions.push(new Production(38, "M38_7"));
    this.symbols.push(new Symbol(-1, "M38_7", "N"));
    this.productions.push(new Production(39, "factor", "+", "factor"));
    this.productions.push(
      new Production(40, "E", "value", "M52_2", "comp", "M52_4")
    );
    this.productions.push(new Production(41, "comp"));
    this.productions.push(new Production(42, "comp", "<", "value", "M42_4"));
    this.productions.push(new Production(42, "M42_4"));
    this.symbols.push(new Symbol(-1, "M42_4", "N"));
    this.productions.push(new Production(43, "comp", "<=", "value", "M43_4"));
    this.productions.push(new Production(43, "M43_4"));
    this.symbols.push(new Symbol(-1, "M43_4", "N"));
    this.productions.push(new Production(44, "comp", ">", "value", "M44_4"));
    this.productions.push(new Production(44, "M44_4"));
    this.symbols.push(new Symbol(-1, "M44_4", "N"));
    this.productions.push(new Production(45, "comp", ">=", "value", "M45_4"));
    this.productions.push(new Production(45, "M45_4"));
    this.symbols.push(new Symbol(-1, "M45_4", "N"));
    this.productions.push(new Production(46, "comp", "==", "value", "M46_4"));
    this.productions.push(new Production(46, "M46_4"));
    this.symbols.push(new Symbol(-1, "M46_4", "N"));
    this.productions.push(new Production(47, "comp", "!=", "value", "M47_4"));
    this.productions.push(new Production(47, "M47_4"));
    this.symbols.push(new Symbol(-1, "M47_4", "N"));
    this.productions.push(
      new Production(48, "value", "item", "M52_2", "items", "M52_4")
    );
    this.productions.push(new Production(49, "items"));
    this.productions.push(
      new Production(50, "items", "+", "item", "M50_3", "items", "M52_4")
    );
    this.productions.push(new Production(50, "M50_3"));
    this.symbols.push(new Symbol(-1, "M50_3", "N"));
    this.productions.push(
      new Production(51, "items", "-", "item", "M51_3", "items", "M52_4")
    );
    this.productions.push(new Production(51, "M51_3"));
    this.symbols.push(new Symbol(-1, "M51_3", "N"));
    this.productions.push(
      new Production(52, "item", "factor", "M52_2", "factors", "M52_4")
    );
    this.productions.push(new Production(52, "M52_2"));
    this.symbols.push(new Symbol(-1, "M52_2", "N"));
    this.productions.push(new Production(52, "M52_4"));
    this.symbols.push(new Symbol(-1, "M52_4", "N"));
    this.productions.push(new Production(53, "factors"));
    this.productions.push(
      new Production(54, "factors", "*", "factor", "M54_3", "factors", "M52_4")
    );
    this.productions.push(new Production(54, "M54_3"));
    this.symbols.push(new Symbol(-1, "M54_3", "N"));
    this.productions.push(
      new Production(55, "factors", "/", "factor", "M55_3", "factors", "M52_4")
    );
    this.productions.push(new Production(55, "M55_3"));
    this.symbols.push(new Symbol(-1, "M55_3", "N"));
    this.productions.push(
      new Production(56, "factors", "%", "factor", "M56_3", "factors", "M52_4")
    );
    this.productions.push(new Production(56, "M56_3"));
    this.symbols.push(new Symbol(-1, "M56_3", "N"));
    this.productions.push(new Production(57, "factor", "!", "factor", "M57_3"));
    this.productions.push(new Production(58, "M57_3"));
    this.symbols.push(new Symbol(-1, "M57_3", "N"));
    this.productions.push(
      new Production(58, "factor", "++", "factor", "M58_3")
    );
    this.productions.push(new Production(58, "M58_3"));
    this.symbols.push(new Symbol(-1, "M58_3", "N"));
    this.productions.push(
      new Production(59, "factor", "--", "factor", "M59_3")
    );
    this.productions.push(new Production(59, "M59_3"));
    this.symbols.push(new Symbol(-1, "M59_3", "N"));
    this.productions.push(new Production(60, "factor", "(", "E", ")", "M60_4"));
    this.productions.push(new Production(60, "M60_4"));
    this.symbols.push(new Symbol(-1, "M60_4", "N"));
    this.productions.push(
      new Production(61, "factor", "id", "M61_2", "call", "M61_4")
    );
    this.productions.push(new Production(61, "M61_2"));
    this.symbols.push(new Symbol(-1, "M61_2", "N"));
    this.productions.push(new Production(61, "M61_4"));
    this.symbols.push(new Symbol(-1, "M61_4", "N"));
    this.productions.push(new Production(62, "factor", "const", "M62_2"));
    this.productions.push(new Production(62, "M62_2"));
    this.symbols.push(new Symbol(-1, "M62_2", "N"));
    this.productions.push(
      new Production(63, "call", "M63_1", "array", "M63_3")
    );
    this.productions.push(new Production(63, "M63_1"));
    this.symbols.push(new Symbol(-1, "M63_1", "N"));
    this.productions.push(new Production(63, "M63_3"));
    this.symbols.push(new Symbol(-1, "M63_3", "N"));
    this.productions.push(new Production(64, "call", "(", "Es", ")"));
    this.productions.push(new Production(65, "Es", "E", "Es'"));
    this.productions.push(new Production(66, "Es'", ",", "E", "Es'"));
    this.productions.push(new Production(67, "Es'"));
    this.productions.push(new Production(68, "type", "CHAR", "M68_2"));
    this.productions.push(new Production(68, "M68_2"));
    this.symbols.push(new Symbol(-1, "M68_2", "N"));
    this.productions.push(new Production(69, "type", "INT", "M69_2"));
    this.productions.push(new Production(69, "M69_2"));
    this.symbols.push(new Symbol(-1, "M69_2", "N"));
    this.productions.push(new Production(70, "type", "LONG", "M70_2"));
    this.productions.push(new Production(70, "M70_2"));
    this.symbols.push(new Symbol(-1, "M70_2", "N"));
    this.productions.push(new Production(71, "type", "SHORT", "M71_2"));
    this.productions.push(new Production(71, "M71_2"));
    this.symbols.push(new Symbol(-1, "M71_2", "N"));
    this.productions.push(new Production(72, "type", "FLOAT", "M72_2"));
    this.productions.push(new Production(72, "M72_2"));
    this.symbols.push(new Symbol(-1, "M72_2", "N"));
    this.productions.push(new Production(73, "type", "DOUBLE", "M73_2"));
    this.productions.push(new Production(73, "M73_2"));
    this.symbols.push(new Symbol(-1, "M73_2", "N"));
    this.productions.push(new Production(74, "const", "int", "M74_2"));
    this.productions.push(new Production(75, "const", "float", "M74_2"));
    this.productions.push(new Production(76, "const", "double", "M74_2"));
    this.productions.push(new Production(77, "const", "char", "M74_2"));
    this.productions.push(new Production(74, "M74_2"));
    this.symbols.push(new Symbol(-1, "M74_2", "N"));
    this.productions.push(new Production(78, "comp", "=", "value", "M78_3"));
    this.productions.push(new Production(78, "M78_3"));
    this.symbols.push(new Symbol(-1, "M78_3", "N"));
    this.productions.push(new Production(79, "comp", "+=", "value", "M79_3"));
    this.productions.push(new Production(79, "M79_3"));
    this.symbols.push(new Symbol(-1, "M79_3", "N"));
    this.productions.push(new Production(80, "comp", "-=", "value", "M80_3"));
    this.productions.push(new Production(80, "M80_3"));
    this.symbols.push(new Symbol(-1, "M80_3", "N"));
    this.productions.push(new Production(81, "comp", "*=", "value", "M81_3"));
    this.productions.push(new Production(81, "M81_3"));
    this.symbols.push(new Symbol(-1, "M81_3", "N"));
    this.productions.push(new Production(82, "comp", "/=", "value", "M82_3"));
    this.productions.push(new Production(82, "M82_3"));
    this.symbols.push(new Symbol(-1, "M82_3", "N"));
    this.productions.push(new Production(83, "comp", "%=", "value", "M83_3"));
    this.productions.push(new Production(83, "M83_3"));
    this.symbols.push(new Symbol(-1, "M83_3", "N"));
    this.productions.push(new Production(84, "factor", "-", "factor", "M84_3"));
    this.productions.push(new Production(84, "M84_3"));
    this.symbols.push(new Symbol(-1, "M84_3", "N"));
    this.productions.push(new Production(85, "const", "string"));
    this.productions.push(new Production(86, "params", "VOID"));
    this.symbols.push(new Symbol(0, "S", "N"));
    this.symbols.push(new Symbol(1, "func", "N"));
    this.symbols.push(new Symbol(2, "params", "N"));
    this.symbols.push(new Symbol(3, "params'", "N"));
    this.symbols.push(new Symbol(4, "func_body", "N"));
    this.symbols.push(new Symbol(5, "block", "N"));
    this.symbols.push(new Symbol(6, "def_stmts", "N"));
    this.symbols.push(new Symbol(7, "def_stmt", "N"));
    this.symbols.push(new Symbol(8, "array", "N"));
    this.symbols.push(new Symbol(9, "vars", "N"));
    this.symbols.push(new Symbol(10, "stmts", "N"));
    this.symbols.push(new Symbol(11, "stmt", "N"));
    this.symbols.push(new Symbol(12, "else", "N"));
    this.symbols.push(new Symbol(13, "cases", "N"));
    this.symbols.push(new Symbol(14, "case", "N"));
    this.symbols.push(new Symbol(15, "e", "N"));
    this.symbols.push(new Symbol(16, "E", "N"));
    this.symbols.push(new Symbol(17, "comp", "N"));
    this.symbols.push(new Symbol(18, "value", "N"));
    this.symbols.push(new Symbol(19, "items", "N"));
    this.symbols.push(new Symbol(20, "item", "N"));
    this.symbols.push(new Symbol(21, "factors", "N"));
    this.symbols.push(new Symbol(22, "factor", "N"));
    this.symbols.push(new Symbol(23, "call", "N"));
    this.symbols.push(new Symbol(24, "Es", "N"));
    this.symbols.push(new Symbol(25, "Es'", "N"));
    this.symbols.push(new Symbol(26, "type", "N"));
    this.symbols.push(new Symbol(27, "const", "N"));
    this.symbols.push(new Symbol(28, "string", "T"));
    this.symbols.push(new Symbol(29, "id", "T"));
    this.symbols.push(new Symbol(30, "(", "T"));
    this.symbols.push(new Symbol(31, ")", "T"));
    this.symbols.push(new Symbol(32, "VOID", "T"));
    this.symbols.push(new Symbol(33, "{", "T"));
    this.symbols.push(new Symbol(34, "}", "T"));
    this.symbols.push(new Symbol(35, ",", "T"));
    this.symbols.push(new Symbol(36, ";", "T"));
    this.symbols.push(new Symbol(37, "=", "T"));
    this.symbols.push(new Symbol(38, "IF", "T"));
    this.symbols.push(new Symbol(39, "SWITCH", "T"));
    this.symbols.push(new Symbol(40, "DO", "T"));
    this.symbols.push(new Symbol(41, "WHILE", "T"));
    this.symbols.push(new Symbol(42, "ELSE", "T"));
    this.symbols.push(new Symbol(43, "CASE", "T"));
    this.symbols.push(new Symbol(44, ":", "T"));
    this.symbols.push(new Symbol(45, "DEFAULT", "T"));
    this.symbols.push(new Symbol(46, "FOR", "T"));
    this.symbols.push(new Symbol(47, "<", "T"));
    this.symbols.push(new Symbol(48, "<=", "T"));
    this.symbols.push(new Symbol(49, ">", "T"));
    this.symbols.push(new Symbol(50, ">=", "T"));
    this.symbols.push(new Symbol(51, "==", "T"));
    this.symbols.push(new Symbol(52, "!=", "T"));
    this.symbols.push(new Symbol(53, "+", "T"));
    this.symbols.push(new Symbol(54, "-", "T"));
    this.symbols.push(new Symbol(55, "*", "T"));
    this.symbols.push(new Symbol(56, "/", "T"));
    this.symbols.push(new Symbol(57, "%", "T"));
    this.symbols.push(new Symbol(58, "!", "T"));
    this.symbols.push(new Symbol(59, "++", "T"));
    this.symbols.push(new Symbol(60, "--", "T"));
    this.symbols.push(new Symbol(61, "CHAR", "T"));
    this.symbols.push(new Symbol(62, "INT", "T"));
    this.symbols.push(new Symbol(63, "LONG", "T"));
    this.symbols.push(new Symbol(64, "SHORT", "T"));
    this.symbols.push(new Symbol(65, "FLOAT", "T"));
    this.symbols.push(new Symbol(66, "DOUBLE", "T"));
    this.symbols.push(new Symbol(67, "int", "T"));
    this.symbols.push(new Symbol(68, "float", "T"));
    this.symbols.push(new Symbol(69, "double", "T"));
    this.symbols.push(new Symbol(70, "char", "T"));
    this.symbols.push(new Symbol(71, "+=", "T"));
    this.symbols.push(new Symbol(72, "-=", "T"));
    this.symbols.push(new Symbol(73, "*=", "T"));
    this.symbols.push(new Symbol(74, "/=", "T"));
    this.symbols.push(new Symbol(75, "%=", "T"));
    this.symbols.push(new Symbol(76, "RETURN", "T"));
    this.symbols.push(new Symbol(77, "CONTINUE", "T"));
    this.symbols.push(new Symbol(78, "BREAK", "T"));
    this.symbols.push(new Symbol(79, "[", "T"));
    this.symbols.push(new Symbol(80, "]", "T"));
    this.symbols.push(new Symbol(81, "#", "T"));
  }

  // 获取first集
  public getFirst() {
    let flag: boolean = true;
    //求first集（所有符号）
    while (flag) {
      {
        for (let i: number = 0; i < <number>this.productions.length; i++) {
          {
            let temp: Production = this.productions[i];
            let left: string = temp.getLeft();
            let right: string[] = temp.getRight();
            let left_symbol: Symbol = this.getSymbol(left);
            for (let j: number = 0; j < right.length; j++) {
              {
                let right_symbol: Symbol = this.getSymbol(right[j]);
                for (
                  let k: number = 0;
                  k < <number>right_symbol.first.length;
                  k++
                ) {
                  {
                    let element: string = right_symbol.first[k];
                    if (!left_symbol.has("first", element)) {
                      left_symbol.first.push(element);
                      flag = false;
                    }
                  }
                }
                //该符号不能推出空，则跳出循环
                if (!this.canBeBlank(right[j])) break;
              }
            }
          }
        }
        flag = !flag; //first集发生改变要重新循环，没发生改变则跳出
      }
    }
  }

  // 获取follow集
  public getFollow() {
    //求follow集（所有非终结符）
    let flag: boolean;
    this.getSymbol("S").follow.push("#");
    flag = true;
    while (flag) {
      {
        for (let i: number = 0; i < <number>this.productions.length; i++) {
          {
            let temp: Production = this.productions[i];
            let left: string = temp.getLeft();
            let right: string[] = temp.getRight();
            if (right.length === 0) continue;
            let left_symbol: Symbol = this.getSymbol(left);
            for (let j: number = 0; j < right.length - 1; j++) {
              {
                let right_symbol: Symbol = this.getSymbol(right[j]);
                if (right_symbol.isTerminal()) continue;
                let follow_symbol: Symbol = this.getSymbol(right[j + 1]);
                for (
                  let k: number = 0;
                  k < <number>follow_symbol.first.length;
                  k++
                ) {
                  {
                    let element: string = follow_symbol.first[k];
                    if (!right_symbol.has("follow", element)) {
                      right_symbol.follow.push(element);
                      flag = false;
                    }
                  }
                }
                //right右边的串如果能推出空，则将left_symbol.follow并入right_symbol.follow
                let blank: boolean = true;
                for (let k: number = j + 1; k < right.length; k++) {
                  {
                    if (this.canBeBlank(right[k])) {
                      if (k + 1 < right.length) {
                        let rr_symbol: Symbol = this.getSymbol(right[k + 1]);
                        for (
                          let m: number = 0;
                          m < <number>rr_symbol.first.length;
                          m++
                        ) {
                          {
                            let element: string = rr_symbol.first[m];
                            if (!right_symbol.has("follow", element)) {
                              right_symbol.follow.push(element);
                              flag = false; //follow集发生改变
                            }
                          }
                        }
                      }
                    } else {
                      blank = false;
                      break;
                    }
                  }
                }
                if (blank) {
                  for (
                    let k: number = 0;
                    k < <number>left_symbol.follow.length;
                    k++
                  ) {
                    {
                      let element: string = left_symbol.follow[k];
                      if (!right_symbol.has("follow", element)) {
                        right_symbol.follow.push(element);
                        flag = false;
                      }
                    }
                  }
                }
              }
            }
            //对于每个产生式，左部符号的follow集要并到右部最后一个符号(如果是非终结符)的follow集中
            let last_symbol: Symbol = this.getSymbol(right[right.length - 1]);
            if (last_symbol.isTerminal()) continue;
            for (
              let k: number = 0;
              k < <number>left_symbol.follow.length;
              k++
            ) {
              {
                let element: string = left_symbol.follow[k];
                if (!last_symbol.has("follow", element)) {
                  last_symbol.follow.push(element);
                  flag = false;
                }
              }
            }
          }
        }
        flag = !flag; //follow集发生改变要重新循环，没发生改变则跳出
      }
    }
  }

  public getSelect() {
    //求select集（所有产生式）

    for (let i: number = 0; i < <number>this.productions.length; i++) {
      {
        let production: Production = this.productions[i];
        if (production.getRight().length === 0) {
          let select: Array<string> = <any>[];
          let follow: Array<string> = this.getSymbol(production.getLeft())
            .follow;
          for (let j: number = 0; j < <number>follow.length; j++) {
            {
              select.push(follow[j]);
            }
          }
          production.setSelect(select);
        } else {
          let select: Array<string> = <any>[];
          let right: string[] = production.getRight();

          let blank: boolean = true; //产生式能推出空
          for (let j: number = 0; j < right.length; j++) {
            {
              let first: Array<string> = this.getSymbol(right[j]).first;
              for (let k: number = 0; k < <number>first.length; k++) {
                {
                  select.push(first[k]);
                }
              }
              if (!this.canBeBlank(right[j])) {
                blank = false;
                break;
              }
            }
          }
          if (blank) {
            let follow: Array<string> = this.getSymbol(production.getLeft())
              .follow;
            for (let k: number = 0; k < <number>follow.length; k++) {
              {
                if (!(select.indexOf(<any>follow[k]) >= 0))
                  select.push(follow[k]);
              }
            }
          }
          production.setSelect(select);
        }
      }
    }
  }

  public getProductions(): Array<Production> {
    return this.productions;
  }

  public getProductionsByLeft(left: string): Array<Production> {
    let ret: Array<Production> = <any>[];
    for (let i: number = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getLeft(), left)) ret.push(temp);
      }
    }
    return ret;
  }

  canBeBlank(name: string): boolean {
    for (let i: number = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getLeft(), name)) {
          let right: string[] = temp.getRight();
          if (right.length === 0) return true;
          let flag: boolean = true;
          for (let j: number = 0; j < right.length; j++) {
            {
              if (!this.canBeBlank(right[j])) {
                flag = false;
                break;
              }
            }
          }
          if (flag) return true;
        }
      }
    }
    return false;
  }
  // similar to canBeBlank(String name)
  // 返回能使name推出空的一连串产生式的第一个
  // 如果name不能推出空，返回null
  getProductionToBlank(name: string): Production {
    for (let i: number = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getLeft(), name)) {
          let right: string[] = temp.getRight();
          if (right.length === 0) return temp;
          let flag: boolean = true;
          for (let j: number = 0; j < right.length; j++) {
            {
              if (!this.canBeBlank(right[j])) {
                flag = false;
                break;
              }
            }
          }
          if (flag) return temp;
        }
      }
    }
    return null;
  }

  public getSymbols(): Array<Symbol> {
    return this.symbols;
  }

  getSymbol(name: string): Symbol {
    for (let i: number = 0; i < <number>this.symbols.length; i++) {
      {
        let temp: Symbol = this.symbols[i];
        if (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getName(), name)) return temp;
      }
    }
    return null; //不在符号表中
  }

  getId(name: string): Id {
    for (let i: number = 0; i < <number>this.ids.length; i++) {
      {
        if (<any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.ids[i].getName(), name)) return this.ids[i];
      }
    }
    return null;
  }

  public analysis(token_list: Array<Token>): void {
    let offset: number = 0; //标识符在内存中的偏移
    let tmpNum: number = 0; //中间变量的index
    let booleanNum: number = 0; //boolean 个数

    token_list.push(new Token("#", null));

    let stack: Array<Symbol> = <any>[]; //符号栈 exact input
    let nodeStack: Array<Node> = <any>[]; // 输入栈 only nonTerminals

    let errorLists: Array<Production> = <any>[];

    stack.push(this.getSymbol("#"));
    stack.push(this.getSymbol("S"));
    nodeStack.push(new Node("S", null));

    let pos: number = 0; //已匹配数目
    let line: number = 1; //行号
    while (pos < <number>token_list.length) {
      {
        let token: Token = token_list[pos];
        let inputSymbol: Symbol = this.getSymbol(token.getName());
        if (inputSymbol == null) {
          //该文法不能识别的输入符号
          if (<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(token.getName(), "ENTER")) {
            line++;
          } else if (<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(token.getName(), "ERROR")) {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              stack[<number>stack.length - 1].getName(),
              stack[<number>stack.length - 1].getName()
            );
            err_pro.setError(
              "无法识别的单词'" + token.getSource() + "' at line " + line
            );
            err_pro.setSolution("跳过错误单词'" + token.getSource() + "'");
            errorLists.push(err_pro);
          } else {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              stack[<number>stack.length - 1].getName(),
              stack[<number>stack.length - 1].getName()
            );
            err_pro.setError(
              "无法识别的输入符号'" + token.getName() + "' at line " + line
            );
            err_pro.setSolution("跳过输入符号'" + token.getName() + "'");
            errorLists.push(err_pro);
          }
          pos++; //跳过
          continue;
        }
        let leftest: Symbol = null;
        let leftNode: Node = null;
        try {
          leftest = stack.pop();
          if (!leftest.isTerminal()) leftNode = nodeStack.pop();
        } catch (e) {
          let err_pro: ErrorProduction = new ErrorProduction(-1, "#", "#");
          err_pro.setError("符号栈已空，输入栈仍然有字符存在");
          err_pro.setSolution("句法分析终止");
          errorLists.push(err_pro);
          break;
        }
        // leftest代表语义分析程序段的文法符号，leftNode.getFather()就代表它所在产生式的左部结点
        switch (leftest.getName()) {
          case "M68_2":
            leftNode.getFather().attribute["type"] = "char";
            leftNode.getFather().attribute["length"] = "1";
            break;
          case "M69_2":
            leftNode.getFather().attribute["type"] = "int";
            leftNode.getFather().attribute["length"] = "4";
            break;
          case "M70_2":
            leftNode.getFather().attribute["type"] = "long";
            leftNode.getFather().attribute["length"] = "4";
            break;
          case "M71_2":
            leftNode.getFather().attribute["type"] = "short";
            leftNode.getFather().attribute["length"] = "2";
            break;
          case "M72_2":
            leftNode.getFather().attribute["type"] = "float";
            leftNode.getFather().attribute["length"] = "4";
            break;
          case "M73_2":
            leftNode.getFather().attribute["type"] = "double";
            leftNode.getFather().attribute["length"] = "8";
            break;
          case "M13_2": {
            let father: Node = leftNode.getFather();
            father.sons[1].attribute["name"] = token_list[pos - 1].getSource();
            father.sons[1].attribute["type"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "type"
            );
            father.sons[1].attribute["length"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "length"
            );
            father.sons[1].attribute["dimension"] = "0";
            break;
          }
          case "M15_4": {
            let father: Node = leftNode.getFather();
            let num: number = parseInt(token_list[pos - 2].getValue());
            let father_dimension: number = parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "dimension"
              )
            );
            father.sons[0].attribute["name"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(father.attribute, "name");
            father.sons[0].attribute["type"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(father.attribute, "type");
            if (
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "length"
              ) != null
            )
              father.sons[0].attribute["length"] =
                parseInt(
                  ((m, k) => (m[k] === undefined ? null : m[k]))(
                    father.attribute,
                    "length"
                  )
                ) *
                  num +
                "";
            father.sons[0].attribute["dimension"] = father_dimension + 1 + "";
            father.sons[0].attribute["arr" + father_dimension] = "" + num;
            for (let i: number = 0; i < father_dimension; i++) {
              {
                father.sons[0].attribute["arr" + i] =
                  "" +
                  ((m, k) => (m[k] === undefined ? null : m[k]))(
                    father.attribute,
                    "arr" + i
                  );
              }
            }
            break;
          }
          case "M14_1": {
            let father: Node = leftNode!.getFather();
            if (
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "length"
              ) != null
            ) {
              // 定义语句中的数组
              let length: number = parseInt(
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "length"
                )
              );
              let id: Id = new Id(
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "name"
                ),
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "type"
                ),
                offset,
                length
              );
              offset += length;
              let dimension: number = parseInt(
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "dimension"
                )
              );
              for (let i: number = 0; i < dimension; i++) {
                {
                  id.arr_list.push(
                    parseInt(
                      ((m, k) => (m[k] === undefined ? null : m[k]))(
                        father.attribute,
                        "arr" + i
                      )
                    )
                  );
                }
              }
              this.ids.push(id);
            } else {
              //执行语句中的数组
              let name: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "name"
              );
              let id: Id = this.getId(name);
              if (id == null) {
                continue;
              }
              let type: string = id.getType();
              let dimension: number = <number>id.arr_list.length;
              let offset: number = 0;
              let width: number = 1;
              for (let i: number = dimension - 1; i >= 0; i--) {
                {
                  let arr: number = parseInt(
                    ((m, k) => (m[k] === undefined ? null : m[k]))(
                      father.attribute,
                      "arr" + i
                    )
                  );
                  offset += arr * width;
                  width *= id.arr_list[i];
                }
              }
              if (<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(type, "int") || <any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(type, "long") || <any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(type, "float")) offset *= 4;
              else if (<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(type, "double")) offset *= 8;
              else if (<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(type, "short")) offset *= 2;
              if (<number>id.arr_list.length) {
                let t: string = "t" + tmpNum++;
                this.codes.push(t + " := " + name + "[" + offset + "]");
                father.attribute["value"] = t;
                father.attribute["val"] = name + "[" + offset + "]";
              } else {
                father.attribute["value"] = name;
              }
            }
            break;
          }
          case "M13_4": {
            let father: Node = leftNode.getFather();
            father.sons[2].attribute["type"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "type"
            );
            father.sons[2].attribute["length"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "length"
            );
            break;
          }
          case "M17_3": {
            let father: Node = leftNode.getFather();
            father.sons[0].attribute["type"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(father.attribute, "type");
            father.sons[0].attribute["length"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(father.attribute, "length");
            father.sons[0].attribute["name"] = token_list[pos - 1].getSource();
            father.sons[0].attribute["dimension"] = "0";
            break;
          }
          case "M17_5": {
            let father: Node = leftNode.getFather();
            father.sons[1].attribute["type"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "type"
            );
            father.sons[1].attribute["length"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "length"
            );
            break;
          }
          case "M74_2": {
            let father: Node = leftNode.getFather();
            father.attribute["value"] = token_list[pos - 1].getValue();
            break;
          }
          case "M57_3": {
            let father: Node = leftNode.getFather();
            let f1: string = "b" + booleanNum++;
            let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(f1 + " := ~" + f2);
            father.attribute["value"] = f1;
            break;
          }
          case "M58_3": {
            let father: Node = leftNode.getFather();
            let f1: string = "t" + tmpNum++;
            let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(f1 + " := " + f2 + " + 1");
            father.attribute["value"] = f1;
            break;
          }
          case "M59_3": {
            let father: Node = leftNode.getFather();
            let f1: string = "t" + tmpNum++;
            let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(f1 + " := " + f2 + " - 1");
            father.attribute["value"] = f1;
            break;
          }
          case "M84_3": {
            let father: Node = leftNode.getFather();
            let f1: string = "t" + tmpNum++;
            let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(f1 + " := 0 - " + f2);
            father.attribute["value"] = f1;
            break;
          }
          case "M60_4": {
            let father: Node = leftNode.getFather();
            father.attribute["value"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "value"
            );
            break;
          }
          case "M61_2": {
            let father: Node = leftNode.getFather();
            father.sons[0].attribute["name"] = token_list[pos - 1].getSource();
            break;
          }
          case "M63_1": {
            let father: Node = leftNode.getFather();
            father.sons[0].attribute["name"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(father.attribute, "name");
            father.sons[0].attribute["dimension"] = "0";
            break;
          }
          case "M15_6":
          case "M63_3":
          case "M61_4":
          case "M62_2": {
            let father: Node = leftNode.getFather();
            father.attribute["value"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "value"
            );
            father.attribute["val"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "val"
            );
            break;
          }
          case "M52_2": {
            let father: Node = leftNode.getFather();
            father.sons[1].attribute["value"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "value"
            );
            father.sons[1].attribute["val"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[0].attribute,
              "val"
            );
            break;
          }
          case "M54_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let t: string = "t" + tmpNum++;
            this.codes.push(t + " := " + inh + " * " + value);
            father.sons[1].attribute["value"] = t;
            break;
          }
          case "M55_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let t: string = "t" + tmpNum++;
            this.codes.push(t + " := " + inh + " / " + value);
            father.sons[1].attribute["value"] = t;
            break;
          }
          case "M56_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let t: string = "t" + tmpNum++;
            this.codes.push(t + " := " + inh + " % " + value);
            father.sons[1].attribute["value"] = t;
            break;
          }
          case "M50_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let t: string = "t" + tmpNum++;
            this.codes.push(t + " := " + inh + " + " + value);
            father.sons[1].attribute["value"] = t;
            break;
          }
          case "M51_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let t: string = "t" + tmpNum++;
            this.codes.push(t + " := " + inh + " - " + value);
            father.sons[1].attribute["value"] = t;
            break;
          }
          case "M52_4": {
            let father: Node = leftNode.getFather();
            father.attribute["value"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[1].attribute,
              "value"
            );
            father.attribute["val"] = ((m, k) =>
              m[k] === undefined ? null : m[k])(
              father.sons[1].attribute,
              "val"
            );
            break;
          }
          case "M42_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " < " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M43_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " <= " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M44_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " > " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M45_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " >= " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M46_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " == " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M47_4": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            let b: string = "b" + booleanNum++;
            this.codes.push(b + " := " + inh + " != " + value);
            father.attribute["value"] = b;
            break;
          }
          case "M78_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "val"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            if (inh == null || <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(inh, "null")) inh = ((m, k) => (m[k] === undefined ? null : m[k]))(father.attribute, "value");
            else {
              let temp: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "value"
              );
              for (let i: number = <number>this.codes.length - 1; i >= 0; i--) {
                {
                  if (
                    this.codes[i] != null &&
                    ((str, searchString, position = 0) =>
                      str.substr(position, searchString.length) ===
                      searchString)(this.codes[i], temp)
                  ) {
                    this.codes.splice(i, 1)[0];
                  }
                }
              }
            }
            this.codes.push(inh + " := " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M79_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(inh + " := " + inh + " + " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M80_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(inh + " := " + inh + " - " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M81_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(inh + " := " + inh + " * " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M82_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(inh + " := " + inh + " / " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M83_3": {
            let father: Node = leftNode.getFather();
            let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "value"
            );
            let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(inh + " := " + inh + " % " + value);
            father.attribute["value"] = inh;
            break;
          }
          case "M26_5": {
            let father: Node = leftNode.getFather();
            let b: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.sons[0].attribute,
              "value"
            );
            this.codes.push(
              "if " + b + " goto " + (<number>this.codes.length + 2)
            );
            father.attribute["backpatch"] = "" + <number>this.codes.length;
            this.codes.push(null);
            break;
          }
          case "M26_7": {
            let father: Node = leftNode.getFather();
            let backpatch: number = parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "backpatch"
              )
            );
            this.codes.push(null);
            this.codes[backpatch] = "goto " + <number>this.codes.length;
            father.attribute["backpatch"] =
              "" + (<number>this.codes.length - 1);
            break;
          }
          case "M26_9": {
            let father: Node = leftNode.getFather();
            let backpatch: number = parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "backpatch"
              )
            );
            this.codes[backpatch] = "goto " + <number>this.codes.length;
            break;
          }
          case "M38_7": {
            let father: Node = leftNode.getFather();
            let backpatch: number = parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "backpatch"
              )
            );
            let backto: number = parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "backto"
              )
            );
            this.codes.push("goto " + backto);
            this.codes[backpatch] = "goto " + <number>this.codes.length;
            break;
          }
          case "M38_3": {
            let father: Node = leftNode.getFather();
            father.attribute["backto"] = "" + <number>this.codes.length;
            break;
          }
        }
        if (leftest.isTerminal()) {
          if (<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(leftest.getName(), inputSymbol.getName())) {
            pos++; // matched
          } else if (pos < <number>token_list.length - 1 && <any>((
              o1: any,
              o2: any
            ) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(token_list[pos + 1].getName(), leftest.getName())) {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              leftest.getName(),
              leftest.getName()
            );
            err_pro.setError(
              "栈顶的终结符" +
                leftest.getName() +
                "与输入的终结符" +
                inputSymbol.getName() +
                "不匹配" +
                " at line " +
                line
            );
            err_pro.setSolution(
              "跳过输入的终结符" + inputSymbol.getName() + "'"
            );
            errorLists.push(err_pro);
            pos++; //跳过一个输入
            stack.push(leftest); //栈顶终结符 压回
          } else {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              leftest.getName()
            );
            err_pro.setError(
              "栈顶的终结符'" +
                leftest.getName() +
                "'与输入的终结符'" +
                inputSymbol.getName() +
                "'不匹配" +
                " at line " +
                line
            );
            err_pro.setSolution("弹出栈顶终结符'" + leftest.getName() + "'");
            errorLists.push(err_pro);
          }
        } else {
          let pros: Array<Production> = this.getProductionsByLeft(
            leftest.getName()
          );
          let error: boolean = true;
          for (let i: number = 0; i < <number>pros.length; i++) {
            {
              if (
                pros[i].getSelect().indexOf(<any>inputSymbol.getName()) >= 0
              ) {
                errorLists.push(pros[i]);
                let right: string[] = pros[i].getRight();
                for (let j: number = right.length - 1; j >= 0; j--) {
                  {
                    let temp: Symbol = this.getSymbol(right[j]);
                    stack.push(temp);
                    if (!temp.isTerminal()) {
                      let node: Node = new Node(temp.getName(), leftNode);
                      if (
                        (c =>
                          c.charCodeAt == null ? <any>c : c.charCodeAt(0))(
                          node.getSymbolName().charAt(0)
                        ) !== "M".charCodeAt(0)
                      )
                        leftNode.sons.splice(0, 0, node);
                      nodeStack.push(node);
                    }
                  }
                }
                error = false;
                break;
              }
            }
          }
          if (error) {
            let pro: Production = this.getProductionToBlank(leftest.getName());
            if (pro != null) {
              let err_pro: ErrorProduction = new ErrorProduction(pro);
              err_pro.setError(
                "栈顶非终结符 '" +
                  leftest.getName() +
                  "' 不能接收输入的终结符 '" +
                  inputSymbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution(
                "使用能将栈顶非终结符 '" +
                  leftest.getName() +
                  "' 推导为空的产生式，推迟错误处理"
              );
              errorLists.push(err_pro);
            } else if (leftest.has("follow", inputSymbol.getName())) {
              let err_pro: ErrorProduction = new ErrorProduction(
                -1,
                leftest.getName()
              );
              err_pro.setError(
                "栈顶非终结符" +
                  leftest.getName() +
                  "不能接收输入的终结符" +
                  inputSymbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution("跳过栈顶非终结符" + leftest.getName() + "'");
              errorLists.push(err_pro);
            } else {
              let err_pro: ErrorProduction = new ErrorProduction(
                -1,
                stack[<number>stack.length - 1].getName(),
                stack[<number>stack.length - 1].getName()
              );
              err_pro.setError(
                "栈顶非终结符'" +
                  leftest.getName() +
                  "' 不能接收输入的终结符'" +
                  inputSymbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution(
                "跳过栈顶非终结符'" + inputSymbol.getName() + "'"
              );
              errorLists.push(err_pro);
              pos++;
              stack.push(inputSymbol);
            }
          }
        }
      }
    }
    for (let i: number = 0; i < <number>this.codes.length; i++) {
      console.info(i + "\t" + this.codes[i]);
    }
  }
}
