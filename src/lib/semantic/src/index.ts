import { MyScanner } from "./scanner";
import { GrammarCompiler } from "./GrammarCompiler";

let input =
  "int main() {\n" +
  "    int a;\n" +
  "    float b;\n" +
  "    int c;\n" +
  "    float e;\n" +
  "    c=10;\n" +
  "    q=5;\n" +
  "    if(c) {\n" +
  "        a = 1 + 10;\n" +
  "        b = 10.9 + 8.9;\n" +
  "    }\n" +
  "    b = 1.11 * 8.9;\n" +
  "    while(a) {\n" +
  "        b = 10.44;\n" +
  "        e = 990.45;\n" +
  "        c = 90;\n" +
  "    }\n" +
  "    c = 80;\n" +
  "}\n" +
  "\n" +
  "int func1 () {\n" +
  "}\n";
/**
 System.out.println("input "+input);
 List<Token> token_list = scan.execute();
 System.out.println("TOKEN LIST: " + token_list);
 */
const scan = new MyScanner(input);
const tokenList = scan.execute();
console.log(tokenList.length);
console.log(tokenList);

const gc = new GrammarCompiler();
gc.analysis(tokenList);
const codes = gc.getCodes();

console.log(codes);
