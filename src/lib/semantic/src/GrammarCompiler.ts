/* eslint-disable @typescript-eslint/camelcase,prettier/prettier,@typescript-eslint/no-explicit-any,@typescript-eslint/explicit-member-accessibility,@typescript-eslint/no-angle-bracket-type-assertion,@typescript-eslint/ban-types,@typescript-eslint/explicit-function-return-type */
import { Production } from "./Production";
import { Node } from "./Node";
import { Symbol } from "./Symbol";
import { ErrorProduction } from "./ErrorProduction";
import { Token } from "./Token";
import { Id } from "./Id";

export class GrammarCompiler {
  productions: Production[];

  symbols: Symbol[];

  ids: Id[];

  codes: string[];

  public getIds(): Id[] {
    return this.ids;
  }

  public getCodes(): string[] {
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

    this.productions.push(new Production(81, "comp", "*=", "value", "M81_3")) >
      0;

    this.productions.push(new Production(81, "M81_3"));

    this.symbols.push(new Symbol(-1, "M81_3", "N"));

    this.productions.push(new Production(82, "comp", "/=", "value", "M82_3")) >
      0;

    this.productions.push(new Production(82, "M82_3"));

    this.symbols.push(new Symbol(-1, "M82_3", "N"));

    this.productions.push(new Production(83, "comp", "%=", "value", "M83_3")) >
      0;

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

  public getFirst() {
    let flag = true;
    while (flag) {
      {
        for (let i = 0; i < <number>this.productions.length; i++) {
          {
            let temp: Production = this.productions[i];
            let left: string = temp.getLeft();
            let right: string[] = temp.getRight();
            let left_symbol: Symbol = this.getSymbol(left);
            for (let j = 0; j < right.length; j++) {
              {
                let right_symbol: Symbol = this.getSymbol(right[j]);
                for (let k = 0; k < <number>right_symbol.first.length; k++) {
                  {
                    let element: string = right_symbol.first[k];
                    if (!left_symbol.has("first", element)) {
                      left_symbol.first.push(element);
                      flag = false;
                    }
                  }
                }
                if (!this.canBeBlank(right[j])) break;
              }
            }
          }
        }
        flag = !flag;
      }
    }
  }

  public getFollow() {
    let flag: boolean;

    this.getSymbol("S").follow.push("#");
    flag = true;
    while (flag) {
      {
        for (let i = 0; i < <number>this.productions.length; i++) {
          {
            let temp: Production = this.productions[i];
            let left: string = temp.getLeft();
            let right: string[] = temp.getRight();
            if (right.length === 0) continue;
            let left_symbol: Symbol = this.getSymbol(left);
            for (let j = 0; j < right.length - 1; j++) {
              {
                let right_symbol: Symbol = this.getSymbol(right[j]);
                if (right_symbol.isTerminal()) continue;
                let follow_symbol: Symbol = this.getSymbol(right[j + 1]);
                for (let k = 0; k < <number>follow_symbol.first.length; k++) {
                  {
                    let element: string = follow_symbol.first[k];
                    if (!right_symbol.has("follow", element)) {
                      right_symbol.follow.push(element);
                      flag = false;
                    }
                  }
                }
                let blank = true;
                for (let k: number = j + 1; k < right.length; k++) {
                  {
                    if (this.canBeBlank(right[k])) {
                      if (k + 1 < right.length) {
                        let rr_symbol: Symbol = this.getSymbol(right[k + 1]);
                        for (
                          let m = 0;
                          m < <number>rr_symbol.first.length;
                          m++
                        ) {
                          {
                            let element: string = rr_symbol.first[m];
                            if (!right_symbol.has("follow", element)) {
                              right_symbol.follow.push(element);
                              flag = false;
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
                  for (let k = 0; k < <number>left_symbol.follow.length; k++) {
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
            let last_symbol: Symbol = this.getSymbol(right[right.length - 1]);
            if (last_symbol.isTerminal()) continue;
            for (let k = 0; k < <number>left_symbol.follow.length; k++) {
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
        flag = !flag;
      }
    }
  }

  public getSelect() {
    for (let i = 0; i < <number>this.productions.length; i++) {
      {
        let production: Production = this.productions[i];
        if (production.getRight().length === 0) {
          let select: string[] = <any>[];
          let follow: string[] = this.getSymbol(production.getLeft()).follow;
          for (let j = 0; j < <number>follow.length; j++) {
            {
              select.push(follow[j]);
            }
          }
          production.setSelect(select);
        } else {
          let select: string[] = <any>[];
          let right: string[] = production.getRight();
          let blank = true;
          for (let j = 0; j < right.length; j++) {
            {
              let first: string[] = this.getSymbol(right[j]).first;
              for (let k = 0; k < <number>first.length; k++) {
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
            let follow: string[] = this.getSymbol(production.getLeft()).follow;
            for (let k = 0; k < <number>follow.length; k++) {
              {
                if (!/* contains */ (select.indexOf(<any>follow[k]) >= 0))
                  select.push(follow[k]);
              }
            }
          }
          production.setSelect(select);
        }
      }
    }
  }

  public getProductions(): Production[] {
    return this.productions;
  }

  public getProductionsByLeft(left: string): Production[] {
    let ret: Production[] = <any>[];
    for (let i = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (/* equals */ <any>((o1: any, o2: any) => {
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

  /*private*/
  canBeBlank(name: string): boolean {
    for (let i = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getLeft(), name)) {
          let right: string[] = temp.getRight();
          if (right.length === 0) return true;
          let flag = true;
          for (let j = 0; j < right.length; j++) {
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

  /*private*/
  getProductionToBlank(name: string): Production {
    for (let i = 0; i < <number>this.productions.length; i++) {
      {
        let temp: Production = this.productions[i];
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getLeft(), name)) {
          let right: string[] = temp.getRight();
          if (right.length === 0) return temp;
          let flag = true;
          for (let j = 0; j < right.length; j++) {
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

  public getSymbols(): Symbol[] {
    return this.symbols;
  }

  getSymbol(name: string): Symbol {
    for (let i = 0; i < <number>this.symbols.length; i++) {
      {
        let temp: Symbol = this.symbols[i];
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(temp.getName(), name)) return temp;
      }
    }
    return null;
  }

  /*private*/
  getId(name: string): Id {
    for (let i = 0; i < <number>this.ids.length; i++) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
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

  public analysis(token_list: Token[]): Production[] {
    let offset = 0;
    let tno = 0;
    let bno = 0;

    token_list.push(new Token("#", null));
    let stack: Symbol[] = <any>[];
    let node_stack: Node[] = <any>[];
    let pro_list: Production[] = <any>[];
    /* push */
    stack.push(this.getSymbol("#"));
    /* push */
    stack.push(this.getSymbol("S"));
    /* push */
    node_stack.push(new Node("S", null));
    let pos = 0;
    let line = 1;
    while (pos < <number>token_list.length) {
      {
        let token: Token = token_list[pos];
        let input_symbol: Symbol = this.getSymbol(token.getName());
        if (input_symbol == null) {
          if (/* equals */ <any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(token.getName(), "ENTER")) {
            line++;
          } else if (/* equals */ <any>((o1: any, o2: any) => {
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
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                token.getSource() +
                "' at line " +
                line
            );
            err_pro.setSolution(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                token.getSource() +
                "'"
            );

            pro_list.push(err_pro);
          } else {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              stack[<number>stack.length - 1].getName(),
              stack[<number>stack.length - 1].getName()
            );
            err_pro.setError(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                token.getName() +
                "' at line " +
                line
            );
            err_pro.setSolution(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                token.getName() +
                "'"
            );

            pro_list.push(err_pro);
          }
          pos++;
          continue;
        }
        let leftest: Symbol = null;
        let left_node: Node = null;
        try {
          leftest = /* pop */ stack.pop();
          if (!leftest.isTerminal()) left_node = /* pop */ node_stack.pop();
        } catch (e) {
          let err_pro: ErrorProduction = new ErrorProduction(-1, "#", "#");
          err_pro.setError(
            "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd"
          );
          err_pro.setSolution(
            "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd"
          );

          pro_list.push(err_pro);
          break;
        }
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M68_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "char";
          /* put */
          left_node.getFather().attribute["length"] = "1";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M69_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "int";
          /* put */
          left_node.getFather().attribute["length"] = "4";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M70_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "long";
          /* put */
          left_node.getFather().attribute["length"] = "4";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M71_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "short";
          /* put */
          left_node.getFather().attribute["length"] = "2";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M72_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "float";
          /* put */
          left_node.getFather().attribute["length"] = "4";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M73_2")) {
          /* put */
          left_node.getFather().attribute["type"] = "double";
          /* put */
          left_node.getFather().attribute["length"] = "8";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M13_2")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[1].attribute["name"] = token_list[pos - 1].getSource();
          /* put */
          father.sons[1].attribute["type"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[0].attribute, "type");
          /* put */
          father.sons[1].attribute["length"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "length"
          );
          /* put */
          father.sons[1].attribute["dimension"] = "0";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M15_4")) {
          let father: Node = left_node.getFather();
          let num: number = /* parseInt */ parseInt(
            token_list[pos - 2].getValue()
          );
          let father_dimension: number = /* parseInt */ parseInt(
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "dimension"
            )
          );
          /* put */
          father.sons[0].attribute["name"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.attribute, "name");
          /* put */
          father.sons[0].attribute["type"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.attribute, "type");
          if (
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "length"
            ) != null
          )
            /* put */ father.sons[0].attribute["length"] =
              /* parseInt */ parseInt(
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "length"
                )
              ) *
                num +
              "";
          /* put */
          father.sons[0].attribute["dimension"] = father_dimension + 1 + "";
          /* put */
          father.sons[0].attribute["arr" + father_dimension] = "" + num;
          for (let i = 0; i < father_dimension; i++) {
            {
              /* put */
              father.sons[0].attribute["arr" + i] =
                "" +
                ((m, k) => (m[k] === undefined ? null : m[k]))(
                  father.attribute,
                  "arr" + i
                );
            }
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M14_1")) {
          let father: Node = left_node.getFather();
          if (
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "length"
            ) != null
          ) {
            let length: number = /* parseInt */ parseInt(
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
            let dimension: number = /* parseInt */ parseInt(
              ((m, k) => (m[k] === undefined ? null : m[k]))(
                father.attribute,
                "dimension"
              )
            );
            for (let i = 0; i < dimension; i++) {
              {
                id.arr_list.push(
                  /* parseInt */ parseInt(
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
            let ofst = 0;
            let width = 1;
            for (let i: number = dimension - 1; i >= 0; i--) {
              {
                let arr: number = /* parseInt */ parseInt(
                  ((m, k) => (m[k] === undefined ? null : m[k]))(
                    father.attribute,
                    "arr" + i
                  )
                );
                ofst += arr * width;
                width *= id.arr_list[i];
              }
            }
            if (/* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(type, "int") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(type, "long") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(type, "float")) ofst *= 4;
            else if (/* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(type, "double")) ofst *= 8;
            else if (/* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(type, "short")) ofst *= 2;
            if (<number>id.arr_list.length > 0) {
              let t: string = "t" + tno++;

              this.codes.push(t + " := " + name + "[" + ofst + "]");
              /* put */
              father.attribute["value"] = t;
              /* put */
              father.attribute["val"] = name + "[" + ofst + "]";
            } else {
              /* put */
              father.attribute["value"] = name;
            }
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M13_4")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[2].attribute["type"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[0].attribute, "type");
          /* put */
          father.sons[2].attribute["length"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "length"
          );
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M17_3")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[0].attribute["type"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.attribute, "type");
          /* put */
          father.sons[0].attribute["length"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.attribute, "length");
          /* put */
          father.sons[0].attribute["name"] = token_list[pos - 1].getSource();
          /* put */
          father.sons[0].attribute["dimension"] = "0";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M17_5")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[1].attribute["type"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[0].attribute, "type");
          /* put */
          father.sons[1].attribute["length"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "length"
          );
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M74_2")) {
          let father: Node = left_node.getFather();
          /* put */
          father.attribute["value"] = token_list[pos - 1].getValue();
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M57_3")) {
          let father: Node = left_node.getFather();
          let f1: string = "b" + bno++;
          let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(f1 + " := ~" + f2);
          /* put */
          father.attribute["value"] = f1;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M58_3")) {
          let father: Node = left_node.getFather();
          let f1: string = "t" + tno++;
          let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(f1 + " := " + f2 + " + 1");
          /* put */
          father.attribute["value"] = f1;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M59_3")) {
          let father: Node = left_node.getFather();
          let f1: string = "t" + tno++;
          let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(f1 + " := " + f2 + " - 1");
          /* put */
          father.attribute["value"] = f1;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M84_3")) {
          let father: Node = left_node.getFather();
          let f1: string = "t" + tno++;
          let f2: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(f1 + " := 0 - " + f2);
          /* put */
          father.attribute["value"] = f1;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M60_4")) {
          let father: Node = left_node.getFather();
          /* put */
          father.attribute["value"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "value"
          );
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M61_2")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[0].attribute["name"] = token_list[pos - 1].getSource();
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M63_1")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[0].attribute["name"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.attribute, "name");
          /* put */
          father.sons[0].attribute["dimension"] = "0";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M15_6") || /* equals */ <any>((
            o1: any,
            o2: any
          ) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M63_3") || /* equals */ <any>((
            o1: any,
            o2: any
          ) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M61_4") || /* equals */ <any>((
            o1: any,
            o2: any
          ) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M62_2")) {
          let father: Node = left_node.getFather();
          /* put */
          father.attribute["value"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "value"
          );
          /* put */
          father.attribute["val"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[0].attribute, "val");
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M52_2")) {
          let father: Node = left_node.getFather();
          /* put */
          father.sons[1].attribute["value"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[0].attribute,
            "value"
          );
          /* put */
          father.sons[1].attribute["val"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[0].attribute, "val");
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M54_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let t: string = "t" + tno++;

          this.codes.push(t + " := " + inh + " * " + value);
          /* put */
          father.sons[1].attribute["value"] = t;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M55_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let t: string = "t" + tno++;

          this.codes.push(t + " := " + inh + " / " + value);
          /* put */
          father.sons[1].attribute["value"] = t;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M56_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let t: string = "t" + tno++;

          this.codes.push(t + " := " + inh + " % " + value);
          /* put */
          father.sons[1].attribute["value"] = t;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M50_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let t: string = "t" + tno++;

          this.codes.push(t + " := " + inh + " + " + value);
          /* put */
          father.sons[1].attribute["value"] = t;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M51_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let t: string = "t" + tno++;

          this.codes.push(t + " := " + inh + " - " + value);
          /* put */
          father.sons[1].attribute["value"] = t;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M52_4")) {
          let father: Node = left_node.getFather();
          /* put */
          father.attribute["value"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(
            father.sons[1].attribute,
            "value"
          );
          /* put */
          father.attribute["val"] = ((m, k) =>
            m[k] === undefined ? null : m[k])(father.sons[1].attribute, "val");
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M42_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " < " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M43_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " <= " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M44_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " > " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M45_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " >= " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M46_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " == " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M47_4")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          let b: string = "b" + bno++;

          this.codes.push(b + " := " + inh + " != " + value);
          /* put */
          father.attribute["value"] = b;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M78_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "val"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );
          if (inh == null || /* equals */ <any>((o1: any, o2: any) => {
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
                  /* startsWith */ ((str, searchString, position = 0) =>
                    str.substr(position, searchString.length) === searchString)(
                    this.codes[i],
                    temp
                  )
                ) {
                  /* remove */
                  this.codes.splice(i, 1)[0];
                }
              }
            }
          }

          this.codes.push(inh + " := " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M79_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(inh + " := " + inh + " + " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M80_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(inh + " := " + inh + " - " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M81_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(inh + " := " + inh + " * " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M82_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(inh + " := " + inh + " / " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M83_3")) {
          let father: Node = left_node.getFather();
          let inh: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.attribute,
            "value"
          );
          let value: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(inh + " := " + inh + " % " + value);
          /* put */
          father.attribute["value"] = inh;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M26_5")) {
          let father: Node = left_node.getFather();
          let b: string = ((m, k) => (m[k] === undefined ? null : m[k]))(
            father.sons[0].attribute,
            "value"
          );

          this.codes.push(
            "if " + b + " goto " + (<number>this.codes.length + 2)
          );
          /* put */
          father.attribute["backpatch"] = "" + <number>this.codes.length;

          this.codes.push(null);
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M26_7")) {
          let father: Node = left_node.getFather();
          let backpatch: number = /* parseInt */ parseInt(
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "backpatch"
            )
          );

          this.codes.push(null);
          /* set */
          this.codes[backpatch] = "goto " + <number>this.codes.length;
          /* put */
          father.attribute["backpatch"] = "" + (<number>this.codes.length - 1);
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M26_9")) {
          let father: Node = left_node.getFather();
          let backpatch: number = /* parseInt */ parseInt(
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "backpatch"
            )
          );
          /* set */
          this.codes[backpatch] = "goto " + <number>this.codes.length;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M38_7")) {
          let father: Node = left_node.getFather();
          let backpatch: number = /* parseInt */ parseInt(
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "backpatch"
            )
          );
          let backto: number = /* parseInt */ parseInt(
            ((m, k) => (m[k] === undefined ? null : m[k]))(
              father.attribute,
              "backto"
            )
          );

          this.codes.push("goto " + backto);
          /* set */
          this.codes[backpatch] = "goto " + <number>this.codes.length;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(leftest.getName(), "M38_3")) {
          let father: Node = left_node.getFather();
          /* put */
          father.attribute["backto"] = "" + <number>this.codes.length;
        }
        if (leftest.isTerminal()) {
          if (/* equals */ <any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(leftest.getName(), input_symbol.getName())) {
            pos++;
          } else if (pos < <number>token_list.length - 1 && /* equals */ <any>((
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
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                leftest.getName() +
                "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                input_symbol.getName() +
                "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd" +
                " at line " +
                line
            );
            err_pro.setSolution(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                input_symbol.getName() +
                "'"
            );

            pro_list.push(err_pro);
            pos++;
            /* push */
            stack.push(leftest);
          } else {
            let err_pro: ErrorProduction = new ErrorProduction(
              -1,
              leftest.getName()
            );
            err_pro.setError(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                leftest.getName() +
                "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                input_symbol.getName() +
                "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd" +
                " at line " +
                line
            );
            err_pro.setSolution(
              "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                leftest.getName() +
                "'"
            );

            pro_list.push(err_pro);
          }
        } else {
          let pros: Production[] = this.getProductionsByLeft(leftest.getName());
          let error = true;
          for (let i = 0; i < <number>pros.length; i++) {
            {
              if (
                /* contains */ pros[i]
                  .getSelect()
                  .indexOf(<any>input_symbol.getName()) >= 0
              ) {
                pro_list.push(pros[i]);
                let right: string[] = pros[i].getRight();
                for (let j: number = right.length - 1; j >= 0; j--) {
                  {
                    let temp: Symbol = this.getSymbol(right[j]);
                    /* push */
                    stack.push(temp);
                    if (!temp.isTerminal()) {
                      let node: Node = new Node(temp.getName(), left_node);
                      if (
                        (c =>
                          c.charCodeAt == null ? <any>c : c.charCodeAt(0))(
                          node.getSymbolName().charAt(0)
                        ) != "M".charCodeAt(0)
                      )
                        left_node.sons.splice(0, 0, node);
                      /* push */
                      node_stack.push(node);
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
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  leftest.getName() +
                  "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  input_symbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution(
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  leftest.getName() +
                  "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd"
              );

              pro_list.push(err_pro);
            } else if (leftest.has("follow", input_symbol.getName())) {
              let err_pro: ErrorProduction = new ErrorProduction(
                -1,
                leftest.getName()
              );
              err_pro.setError(
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  leftest.getName() +
                  "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  input_symbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution(
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  leftest.getName() +
                  "'"
              );

              pro_list.push(err_pro);
            } else {
              let err_pro: ErrorProduction = new ErrorProduction(
                -1,
                stack[<number>stack.length - 1].getName(),
                stack[<number>stack.length - 1].getName()
              );
              err_pro.setError(
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  leftest.getName() +
                  "'\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  input_symbol.getName() +
                  "' at line " +
                  line
              );
              err_pro.setSolution(
                "\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd'" +
                  input_symbol.getName() +
                  "'"
              );

              pro_list.push(err_pro);
              pos++;
              /* push */
              stack.push(input_symbol);
            }
          }
        }
      }
    }
    console.info(
      "DEBUG" +
        /* implicit toString */ (a => (a ? "[" + a.join(", ") + "]" : "null"))(
          this.codes
        )
    );
    for (let i = 0; i < <number>this.codes.length; i++) {
      {
        console.info(i + "\t" + this.codes[i]);
      }
    }
    return pro_list;
  }
}

GrammarCompiler["__class"] = "GrammarCompiler";
