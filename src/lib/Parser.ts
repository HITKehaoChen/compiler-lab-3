const readline = (window as any).require("readline");
const fs = (window as any).require("fs");
const path = (window as any).require("path");
const process = (window as any).require("process");
import { once } from "./helper";

export class Parser {
  private predictMap: Map<string, string>;
  private inputCache: string[];
  private stack: string[];

  constructor(inputCache: string[]) {
    this.predictMap = new Map<string, string>();
    this.inputCache = inputCache;
    this.stack = [];
  }

  // https://www.wikiwand.com/en/LL_parser
  parsing = async (): Promise<any> => {
    await this.getPredictMap();
    const ret = [];
    this.stack.push("S");
    // while the stack is not empty and a inputCache exists
    while (this.stack.length > 0 && this.inputCache.length > 0) {
      try {
        if (this.inputCache[0] === this.stack[this.stack.length - 1]) {
          this.inputCache.shift();
          this.stack.pop();
          continue;
        }
      } catch (e) {
        console.log(e);
      }

      // match the char
      const leftAndInput =
        this.stack[this.stack.length - 1] + "-" + this.inputCache[0];
      // if matched
      const right = this.predictMap.get(leftAndInput);
      if (right != null) {
        // output the production and process
        let process = "";
        for (let i = this.stack.length - 1; i >= 0; i--) {
          process += this.stack[i] + " ";
        }
        // log
        const prod = this.stack[this.stack.length - 1] + " -> " + right;
        console.log("table4", prod, "PROCESS: ", process);
        ret.push({ key: prod, value: process });
        // remove the out
        this.stack.pop();
        if (right === "$") {
          //
        } else {
          const args = right!.split(" ");
          for (let i = args.length - 1; i >= 0; i--) {
            this.stack.push(args[i]);
          }
        }
      } else {
        // error
        let process = "";
        for (let i = this.stack.length - 1; i >= 0; i--) {
          process += this.stack[i] + " ";
        }

        console.log(
          "table4",
          "Error at: ",
          this.inputCache[0],
          "production:",
          leftAndInput
        );
        ret.push({
          key: "Error at: " + this.inputCache[0],
          value: "production: " + leftAndInput
        });

        this.inputCache.shift();
      }
    }
    return ret;
  };

  getPredictMap = async () => {
    try {
      const file = path.resolve(process.cwd(), "./src/lib/analysisTable.txt");
      const lineReader = readline.createInterface({
        input: fs.createReadStream(file)
      });
      lineReader.on("line", (line: string) => {
        const [left, right] = line.split("#");
        const [symbol, r] = right.split("->");

        this.predictMap.set(left + "-" + symbol.trim(), r.trim());
      });
      await once(lineReader, "close");

      // console.log("this.Map", this.predictMap.size);
      // console.log("this.Map", this.predictMap);
      // console.log(this.nonTerminals);
    } catch (e) {
      console.log("ERROR:", e);
    }
  };
}
