/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
export class Token {
  static id_list: string[] = null;

  name: string;

  value: string = null;

  source: string;

  public static getId_list(): string[] {
    return Token.id_list;
  }

  public static freeId_list() {
    Token.id_list = <any>[];
  }

  public getName(): string {
    return this.name;
  }

  public getValue(): string {
    return this.value;
  }

  public getSource(): string {
    return this.source;
  }

  /**
   *
   * @return {string}
   */
  public toString(): string {
    return (
      "\n[value: " +
      this.value +
      " name: " +
      this.name +
      ", source: " +
      this.source +
      " ]"
    );
  }

  public constructor(name?: any, source?: any) {
    if (
      (typeof name === "string" || name === null) &&
      (typeof source === "string" || source === null)
    ) {
      if (this.name === undefined) this.name = null;
      if (this.source === undefined) this.source = null;
      this.value = null;
      if (this.name === undefined) this.name = null;
      if (this.source === undefined) this.source = null;
      (() => {
        this.name = name;
        this.source = source;
        if (source == null) return;
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "int") || /* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "unsigned") || /* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "long") || /* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "long_unsigned")) {
          let k: number;
          let begin: number;
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(0)
            ) === "0".charCodeAt(0)
          ) {
            if (source.length === 1 || /* equals */ <any>((
                o1: any,
                o2: any
              ) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0l") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0L") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0U") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0u") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0LU") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0Lu") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0lU") || /* equals */ <any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })(source, "0lu")) {
              this.value = "0";
              return;
            }
            if (
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                source.charAt(1)
              ) === "x".charCodeAt(0) ||
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                source.charAt(1)
              ) === "X".charCodeAt(0)
            ) {
              k = 16;
              begin = 2;
            } else if (
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                source.charAt(1)
              ) >= "0".charCodeAt(0) &&
              (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                source.charAt(1)
              ) <= "7".charCodeAt(0)
            ) {
              k = 8;
              begin = 1;
            } else {
              throw new Error("整形常量" + source + "'的第二个字符不合法");
            }
          } else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(0)
            ) >= "1".charCodeAt(0) &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(0)
            ) <= "9".charCodeAt(0)
          ) {
            k = 10;
            begin = 0;
          } else {
            throw new Error("整形常量'" + source + "'的首字符必须是数字");
          }
          let ret = 0;
          for (let i: number = begin; i < source.length; i++) {
            {
              let temp: number = Token.char_to_int(source.charAt(i));
              if (temp < 0) break;
              ret *= k;
              ret += temp;
            }
          }
          this.value = "" + ret;
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "float") || /* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "double") || /* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "long_double")) {
          let p1: number = source.indexOf(".");
          let p2: number =
            source.indexOf("e") > source.indexOf("E")
              ? source.indexOf("e")
              : source.indexOf("E");
          let p3: number = p2;
          if (p2 < 0) p2 = source.length;
          else if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(p2 + 1)
            ) === "-".charCodeAt(0) ||
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(p2 + 1)
            ) === "+".charCodeAt(0)
          )
            p3++;
          let zhengbu = 0;
          for (let i = 0; i < p1; i++) {
            {
              zhengbu *= 10;
              zhengbu += (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>(
                Token.char_to_int(source.charAt(i))
              ));
            }
          }
          let xiaoshubu = 0.0;
          for (let i: number = p2 - 1; i > p1; i--) {
            {
              xiaoshubu += <number>Token.char_to_int(source.charAt(i));
              xiaoshubu /= 10.0;
            }
          }
          let zhishu = 0;
          for (let i: number = p3 + 1; i < source.length; i++) {
            {
              let temp: number = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<
                number
              >Token.char_to_int(source.charAt(i)));
              if (temp < 0) break;
              zhishu *= 10;
              zhishu += temp;
            }
          }
          if (
            p3 >= 0 &&
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(p3)
            ) === "-".charCodeAt(0)
          )
            zhishu = -zhishu;
          if (p3 < 0) zhishu = 0;
          this.value = (zhengbu + xiaoshubu) * Math.pow(10.0, zhishu) + "";
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "char")) {
          if (
            (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              source.charAt(1)
            ) === "\\".charCodeAt(0)
          ) {
            let ret = 0;
            let temp: string = source.charAt(2);
            switch (temp.charCodeAt(0)) {
              case 120 /* 'x' */:
                ret += Token.char_to_int(source.charAt(3));
                if (
                  (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                    source.charAt(4)
                  ) !== "'".charCodeAt(0)
                ) {
                  ret *= 16;
                  ret += Token.char_to_int(source.charAt(4));
                }
                break;
              case 110 /* 'n' */:
                ret = "\n".charCodeAt(0);
                break;
              case 114 /* 'r' */:
                ret = "\r".charCodeAt(0);
                break;
              case 116 /* 't' */:
                ret = "\t".charCodeAt(0);
                break;
              case 118 /* 'v' */:
                ret = 11;
                break;
              case 98 /* 'b' */:
                ret = "\b".charCodeAt(0);
                break;
              case 102 /* 'f' */:
                ret = "\f".charCodeAt(0);
                break;
              case 97 /* 'a' */:
                ret = 7;
                break;
              default:
                if (
                  (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                    source.charAt(2)
                  ) >= "0".charCodeAt(0) &&
                  (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                    source.charAt(2)
                  ) <= "7".charCodeAt(0)
                ) {
                  ret +=
                    (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                      source.charAt(2)
                    ) - "0".charCodeAt(0);
                  if (
                    (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                      source.charAt(3)
                    ) !== "'".charCodeAt(0)
                  ) {
                    ret *= 8;
                    ret +=
                      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                        source.charAt(3)
                      ) - "0".charCodeAt(0);
                    if (
                      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
                        source.charAt(4)
                      ) !== "'".charCodeAt(0)
                    ) {
                      ret *= 8;
                      ret +=
                        (c =>
                          c.charCodeAt == null ? <any>c : c.charCodeAt(0))(
                          source.charAt(4)
                        ) - "0".charCodeAt(0);
                    }
                  }
                } else {
                  ret = source.charAt(2).charCodeAt(0);
                }
            }
            this.value = ret + "";
          } else {
            this.value = source.charAt(1).charCodeAt(0) + "";
          }
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "string")) {
          this.value = source.substring(1, source.length - 1);
        } else if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(name, "id")) {
          let temp: number = Token.search_id_list(source);
          if (temp >= 0) {
            this.value = temp + "";
          } else {
            /* add */
            Token.id_list.push(source) > 0;
            this.value = /* size */ <number>Token.id_list.length - 1 + "";
          }
        }
      })();
    } else if (name === undefined && source === undefined) {
      if (this.name === undefined) this.name = null;
      if (this.source === undefined) this.source = null;
      this.value = null;
      if (this.name === undefined) this.name = null;
      if (this.source === undefined) this.source = null;
    } else throw new Error("invalid overload");
  }

  public clone(): Token {
    try {
      return <Token>/* clone */ /* clone */ ((o: any) => {
        let clone = Object.create(o);
        for (let p in o) {
          if (o.hasOwnProperty(p)) clone[p] = o[p];
        }
        return clone;
      })(this);
    } catch (e) {
      console.error(e.message, e);
      return null;
    }
  }

  /*private*/
  static char_to_int(c: string): number {
    if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >=
        "0".charCodeAt(0) &&
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <=
        "9".charCodeAt(0)
    ) {
      return (
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) -
        "0".charCodeAt(0)
      );
    } else if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >=
        "a".charCodeAt(0) &&
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <=
        "f".charCodeAt(0)
    ) {
      return (
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) -
        "a".charCodeAt(0) +
        10
      );
    } else if (
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) >=
        "A".charCodeAt(0) &&
      (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) <=
        "F".charCodeAt(0)
    ) {
      return (
        (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) -
        "A".charCodeAt(0) +
        10
      );
    } else {
      return -1;
    }
  }

  /*private*/
  static search_id_list(id: string): number {
    for (let i = 0; i < /* size */ <number>Token.id_list.length; i++) {
      {
        if (/* equals */ <any>((o1: any, o2: any) => {
            if (o1 && o1.equals) {
              return o1.equals(o2);
            } else {
              return o1 === o2;
            }
          })(id, /* get */ Token.id_list[i])) return i;
      }
    }
    return -1;
  }
}
