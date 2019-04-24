import { Production } from "./production";
// import * as fs from 'fs';
// import * as util from "util";
// import * as path from 'path';
const readline = (window as any).require("readline");
const fs = (window as any).require("fs");
const util = (window as any).require("util");
const path = (window as any).require("path");

util.promisify(fs.readFile);
const process = (window as any).require("process");

import { once } from "./helper";

export class GrammerAnalysis {
  private productions: Production[] = [];
  private terminals: string[] = [];
  private nonTerminals: string[] = [];
  private firsts: Map<string, Array<string>> = new Map<string, Array<string>>();
  private follows: Map<string, Array<string>> = new Map<
    string,
    Array<string>
  >();

  constructor() {}

  grammarAnalyze = async () => {
    await this.readProductions();
    await this.setNonTerminals();
    await this.setTerminals();

    await this.getFirst();
    await this.getFollow();
    await this.getSelect();

    await this.generatePredict();
  };

  readProductions = async () => {
    try {
      const file = path.resolve(process.cwd(), "./src/lib/grammar.txt");
      // const file = path.resolve(`${"grammar.txt"}`);
      const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
      });
      lineReader.on("line", (line: string) => {
        const [l, r] = line.split("->");
        const production = new Production(l.trim(), r.trim().split(" "));

        this.productions.push(production);
      });
      await once(lineReader, "close");

      // console.log(this.productions);
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  setNonTerminals = async () => {
    try {
      const file = path.resolve(process.cwd(), "./src/lib/grammar.txt");
      const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
      });
      lineReader.on("line", (line: string) => {
        const [left] = line.split("->");
        // const production = new Production(l.trim(), r.trim().split(' '));
        const l = left.trim();
        // this.productions.push(production);
        if (!this.nonTerminals.includes(l)) {
          this.nonTerminals.push(l);
        }
      });
      await once(lineReader, "close");

      // console.log(this.nonTerminals);
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  setTerminals = () => {
    const { productions: prods } = this;

    console.log(this.productions.length);
    for (let i = 0; i < prods.length; i++) {
      const r: string[] = prods[i].rights();
      console.log(r);
      for (let j = 0; j < r.length; j++) {
        if (!this.nonTerminals.includes(r[j]) && r[j] !== "$") {
          this.terminals.push(r[j]);
        }
      }
    }
    // console.log(this.terminals);
  };

  // get first collections
  getFirst = () => {
    let first: string[] = [];
    const { terminals, firsts } = this;
    for (let i = 0; i < terminals.length; i++) {
      first = [];
      first.push(terminals[i]);
      firsts.set(terminals[i], first);
    }

    for (let i = 0; i < this.nonTerminals.length; i++) {
      first = [];
      firsts.set(this.nonTerminals[i], first);
    }

    while (true) {
      let flag = true;
      for (let i = 0; i < this.productions.length; i++) {
        const left: string = this.productions[i].left();
        const rights: string[] = this.productions[i].rights();

        for (let j = 0; j < rights.length; j++) {
          // loop every right el in rights
          const right = rights[j];
          // see if right exist or null
          if (right !== "$") {
            for (let l = 0; l < firsts.get(right)!.length; l++) {
              if (firsts.get(left)!.includes(firsts.get(right)![l])) {
              } else {
                firsts.get(left)!.push(firsts.get(right)![l]);
                flag = false;
              }
            }
          }

          // if the right can be null
          if (this.canBeNull(right)) {
          } else {
            break;
          }
        }
      }
      if (flag) {
        break;
      }
    }
  };

  canBeNull = (symbol: string): boolean => {
    for (let i = 0; i < this.productions.length; i++) {
      // find the prod
      if (this.productions[i].left() === symbol) {
        const rights: string[] = this.productions[i].rights();
        if (rights[0] === "$") {
          return true;
        }
      }
    }
    return false;
  };

  getFollow = () => {
    let follow: string[] = [];
    for (let i = 0; i < this.nonTerminals.length; i++) {
      follow = [];
      this.follows.set(this.nonTerminals[i], follow);
    }
    // add # to follow(S)
    this.follows.get("S")!.push("#");

    while (true) {
      let flag = true;
      for (let i = 0; i < this.productions.length; i++) {
        const rights: string[] = this.productions[i].rights();

        for (let j = 0; j < rights.length; j++) {
          const right = rights[j];

          // nonTerminals
          if (this.nonTerminals.includes(right)) {
            let fab = true;
            for (let k = j + 1; k < rights.length; k++) {
              // find first
              for (let v = 0; v < this.firsts.get(rights[k])!.length; v++) {
                const r = this.follows.get(right)!;
                const f = this.firsts.get(rights[k])![v];
                if (r.includes(f)) {
                  continue;
                } else {
                  r.push(f);
                }
              }
              if (this.canBeNull(rights[k])) {
                continue;
              } else {
                fab = false;
                break;
              }
            }

            // if there is a production A -> aB or A -> aBb and FIRST(b) has e
            // then follow B has all on A
            if (fab) {
              const left = this.productions[i].left();
              for (let i = 0; i < this.follows.get(left)!.length; i++) {
                const r = this.follows.get(right)!;
                const l = this.follows.get(left)![i];
                if (!r.includes(l)) {
                  r.push(l);
                  flag = false;
                }
              }
            }
          }
        }
      }
      if (flag) {
        break;
      }
    }
    // clear # in follow
    for (let j = 0; j < this.nonTerminals.length; j++) {
      const left = this.nonTerminals[j];
      const f: string[] = this.follows.get(left)!;
      for (let i = 0; i < f.length; i++) {
        if (f[i] === "#") {
          f.splice(i, 1);
        }
      }
    }
  };

  getSelect = () => {
    for (let i = 0; i < this.productions.length; i++) {
      const el = this.productions[i];

      const left = el.left();
      const rights: string[] = el.rights();

      if (rights[0] === "$") {
        // select(i) = follow(A)
        const follow = this.follows.get(left)!;
        for (let j = 0; j < follow.length; j++) {
          if (this.productions[i].select.includes(follow[j])) {
            continue;
          } else {
            this.productions[i].select.push(follow[j]);
          }
        }
      } else {
        // if G[i] => A -> aB
        // then SELECT(i) = {a}
        let flag = true;
        for (let j = 0; j < rights.length; j++) {
          const right = rights[j];
          const first = this.firsts.get(right)!;
          for (let v = 0; v < first.length; v++) {
            if (!this.productions[i].select.includes(first[v])) {
              this.productions[i].select.push(first[v]);
            }
          }
          if (this.canBeNull(right)) {
            continue;
          } else {
            flag = false;
            break;
          }
        }
        // first has null
        if (flag) {
          const follow = this.follows.get(left)!;
          for (let j = 0; j < follow.length; j++) {
            if (!this.productions[i].select.includes(follow[j])) {
              this.productions[i].select.push(follow[j]);
            }
          }
        }
      }
    }
  };

  generatePredict = () => {
    let content: string = "";

    for (let i = 0; i < this.productions.length; i++) {
      const production = this.productions[i];
      for (let j = 0; j < production.select.length; j++) {
        let line = production.left() + "#" + production.select[j] + " ->";
        const rights = production.rights();

        rights.map(r => (line += " " + r));
        line += "\n";
        content += line;
      }
    }

    try {
      const file = path.resolve(process.cwd(), "./src/lib/analysisTable.txt");
      fs.writeFileSync(file, content, "utf-8");
    } catch (e) {
      console.log(e);
      alert("Failed to save table into file!");
    }
  };
}
