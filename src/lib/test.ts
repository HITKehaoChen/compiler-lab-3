import { GrammerAnalysis } from "./grammerAnalysis";
import { analyze } from "./utils";
import { Parser } from "./Parser";

const tokenArray = analyze('int main(){\n' +
  '\tint a;\n' +
  '\ta=10;\n' +
  '\tif(a>0){\n' +
  '\t\ta=1;\n' +
  '\t}\n' +
  '\telse{\n' +
  '\t\ta=2;\n' +
  '\t}\n' +
  '\twhile(a>0){\n' +
  '\t\ta=3;\n' +
  '\t}\n' +
  '}');
const grammerAnalysis = new GrammerAnalysis();

console.log('tokenArray: ', tokenArray);
const parser = new Parser(tokenArray);
parser.parsing();

