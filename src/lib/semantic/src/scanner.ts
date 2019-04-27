import { Token } from "./Token";
import { ErrorToken } from "./ErrorToken";
import { ConstantType } from "./ConstantType";

export class MyScanner {
  keys: string[] = [
    "asm",
    "auto",
    "break",
    "case",
    "cdecl",
    "char",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "far",
    "float",
    "for",
    "goto",
    "huge",
    "if",
    "interrupt",
    "int",
    "long",
    "near",
    "pascal",
    "register",
    "return",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "switch",
    "typedef",
    "union",
    "unsigned",
    "void",
    "volatile",
    "while"
  ];

  rwords: string[] = ["new", "delete"];

  pos: number = 0;

  source: string;

  status: string = "S";

  public constructor(source: string) {
    if (this.source === undefined) this.source = null;
    this.source = source;
  }

  public execute(): Array<Token> {
    Token.freeId_list();
    let next_char: string;
    let begin_pos: number = 0;
    let list: Array<Token> = <any>[];
    while (true) {
      {
        next_char = this.getNextChar();
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "S")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "0".charCodeAt(0)
          ) {
            this.status = "AB";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "1".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            this.status = "AC";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            this.status = "BA";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === '"'.charCodeAt(0)
          ) {
            this.status = "CA";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "_".charCodeAt(0) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "z".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "Z".charCodeAt(0))
          ) {
            this.status = "DT";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === " ".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\t".charCodeAt(0)
          ) {
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("ENTER", null));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "(".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("(", "("));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ")".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token(")", ")"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "[".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("[", "["));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "]".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("]", "]"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ".".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token(".", "."));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "~".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("~", "~"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "?".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("?", "?"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ":".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token(":", ":"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ",".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token(",", ","));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "{".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("{", "{"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "}".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token("}", "}"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ";".charCodeAt(0)
          ) {
            /* add */
            list.push(new Token(";", ";"));
            begin_pos = this.pos;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "-".charCodeAt(0)
          ) {
            this.status = "EA";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "+".charCodeAt(0)
          ) {
            this.status = "EB";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "<".charCodeAt(0)
          ) {
            this.status = "EC";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ">".charCodeAt(0)
          ) {
            this.status = "EE";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            this.status = "EG";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "&".charCodeAt(0)
          ) {
            this.status = "EH";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "|".charCodeAt(0)
          ) {
            this.status = "EI";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "*".charCodeAt(0)
          ) {
            this.status = "EJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "%".charCodeAt(0)
          ) {
            this.status = "EL";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "^".charCodeAt(0)
          ) {
            this.status = "EM";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "!".charCodeAt(0)
          ) {
            this.status = "EN";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "/".charCodeAt(0)
          ) {
            this.status = "FA";
          } else {
            /* add */
            list.push(
              new ErrorToken("ERROR", "非法的开始字符", next_char + "")
            );
            begin_pos = this.pos;
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AB")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "x".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "X".charCodeAt(0)
          ) {
            this.status = "AE";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            this.status = "AD";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "8".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "9".charCodeAt(0)
          ) {
            this.status = "AI";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ".".charCodeAt(0)
          ) {
            this.status = "AG";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "e".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "E".charCodeAt(0)
          ) {
            this.status = "AJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "u".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "U".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("unsigned", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            this.status = "AN";
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.INT,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AC")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ".".charCodeAt(0)
          ) {
            this.status = "AG";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "e".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "E".charCodeAt(0)
          ) {
            this.status = "AJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "u".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "U".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("unsigned", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            this.status = "AN";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.INT,
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.INT,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AD")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "8".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "9".charCodeAt(0)
          ) {
            this.status = "AI";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ".".charCodeAt(0)
          ) {
            this.status = "AG";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "e".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "E".charCodeAt(0)
          ) {
            this.status = "AJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "u".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "U".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("unsigned", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            this.status = "AN";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.DOUBLE,
                this.source.substring(begin_pos, this.pos)
              )
            );
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.INT,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AE")) {
          if (
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "9".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "f".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "F".charCodeAt(0))
          ) {
            this.status = "AF";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的十六进制表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AF")) {
          if (
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "9".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "f".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "F".charCodeAt(0))
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "u".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "U".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("unsigned", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            this.status = "AN";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.DOUBLE,
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.INT,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AG")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            this.status = "AH";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的小数表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AH")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "e".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "E".charCodeAt(0)
          ) {
            this.status = "AJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "f".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "F".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.FLOAT,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.LONG_DOUBLE,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.DOUBLE,
                this.source.substring(begin_pos, this.pos)
              )
            );
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.DOUBLE,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AI")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ".".charCodeAt(0)
          ) {
            this.status = "AG";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "e".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "E".charCodeAt(0)
          ) {
            this.status = "AJ";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "非法的八进制数表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AJ")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "+".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "-".charCodeAt(0)
          ) {
            this.status = "AK";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            this.status = "AL";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的指数表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AK")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            this.status = "AL";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的指数表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AL")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "9".charCodeAt(0)
          ) {
            continue;
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "f".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "F".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.FLOAT,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "l".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "L".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.LONG_DOUBLE,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.DOUBLE,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "AN")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "u".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "U".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.LONG_UNSIGNED,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token(
                ConstantType.LONG,
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BA")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\\".charCodeAt(0)
          ) {
            this.status = "BD";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            this.status = "BB";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BB")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "错误的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BD")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "0".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "1".charCodeAt(0)
          ) {
            this.status = "BI";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "2".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            this.status = "BJ";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "x".charCodeAt(0)
          ) {
            this.status = "BM";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            this.status = "BEG";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BEG")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "错误的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BI")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            this.status = "BJ";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BJ")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            this.status = "BK";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BK")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BM")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) <= "7".charCodeAt(0)
          ) {
            this.status = "BN";
          } else if (
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "8".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "9".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "f".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "F".charCodeAt(0))
          ) {
            this.status = "BP";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BN")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "9".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "f".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "F".charCodeAt(0))
          ) {
            this.status = "BP";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "BP")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "'".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.CHAR,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "CA")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === '"'.charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(
                ConstantType.STRING,
                this.source.substring(begin_pos, this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\\".charCodeAt(0)
          ) {
            this.status = "CB";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符串表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符串表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            continue;
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "CB")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "不完整的字符串表示形式",
                this.source.substring(begin_pos, --this.pos)
              )
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            this.status = "CA";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "DT")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "_".charCodeAt(0) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "a".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "z".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "A".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "Z".charCodeAt(0)) ||
            ((c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) >= "0".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                next_char
              ) <= "9".charCodeAt(0))
          ) {
            continue;
          } else {
            let temp: string = this.source.substring(begin_pos, --this.pos);
            let flag: boolean = true;
            for (let i: number = 0; i < this.keys.length; i++) {
              {
                if (/* equals */ <any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })(this.keys[i], temp)) {
                  /* add */
                  list.push(new Token(temp.toUpperCase(), temp));
                  flag = false;
                  break;
                }
              }
            }
            for (let i: number = 0; i < this.rwords.length; i++) {
              {
                if (/* equals */ <any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })(this.rwords[i], temp)) {
                  /* add */
                  list.push(
                    new ErrorToken("ERROR", "保留字不能作为标示符使用", temp)
                  );
                  flag = false;
                  break;
                }
              }
            }
            if (flag) /* add */ list.push(new Token("id", temp));
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EA")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ">".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("->", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("-=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "-".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("--", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("-", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EB")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "+".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("++", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("+=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("+", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EC")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "<".charCodeAt(0)
          ) {
            this.status = "ED";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("<=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("<", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "ED")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("<<=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("<<", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EE")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === ">".charCodeAt(0)
          ) {
            this.status = "EF";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(">=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token(">", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EF")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token(">>=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token(">>", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EG")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("==", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("=", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EH")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "&".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("&&", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("&=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("&", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EI")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "|".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("||", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("|=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("|", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EJ")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("*=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("*", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EL")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("%=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("%", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EM")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("^=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("^", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "EN")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("!=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("!", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "FA")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "/".charCodeAt(0)
          ) {
            this.status = "FC";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "*".charCodeAt(0)
          ) {
            this.status = "FE";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "=".charCodeAt(0)
          ) {
            /* add */
            list.push(
              new Token("/=", this.source.substring(begin_pos, this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          } else {
            /* add */
            list.push(
              new Token("/", this.source.substring(begin_pos, --this.pos))
            );
            begin_pos = this.pos;
            this.status = "S";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "FC")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\n".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "\r".charCodeAt(0)
          ) {
            begin_pos = this.pos;
            this.status = "S";
            /* add */
            list.push(new Token("ENTER", null));
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            break;
          } else {
            continue;
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "FE")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "*".charCodeAt(0)
          ) {
            this.status = "FF";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "缺少'*/'作为注释的结束符",
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else {
            continue;
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(this.status, "FF")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "/".charCodeAt(0)
          ) {
            begin_pos = this.pos;
            this.status = "S";
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === 0
          ) {
            /* add */
            list.push(
              new ErrorToken(
                "ERROR",
                "缺少'*/'作为注释的结束符",
                this.source.substring(begin_pos, --this.pos)
              )
            );
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              next_char
            ) === "*".charCodeAt(0)
          ) {
            continue;
          } else {
            this.status = "FE";
          }
        }
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            next_char
          ) === 0
        )
          break;
      }
    }
    return list;
  }

  /*private*/
  getNextChar(): string {
    if (this.pos >= this.source.length) {
      this.pos++;
      return String.fromCharCode(0);
    } else {
      return this.source.charAt(this.pos++);
    }
  }
}
