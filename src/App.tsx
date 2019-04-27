import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { GrammarAnalysis } from "./lib/grammerAnalysis";
// import { analyze } from "./lib/utils";
import { Parser } from "./lib/grammar/Parser";
import { analyze } from "./lib/grammar/utils";
import { GrammarAnalysis } from "./lib/grammar/grammarAnalysis";
// @ts-ignore

import { MyScanner } from "./lib/semantic/src/scanner";
import { GrammarCompiler } from "./lib/semantic/src/GrammarCompiler";

class App extends Component {
  componentDidMount() {
    // this.main();
  }

  main = () => {
    const tokenArray = analyze(
      "int main(){\n" +
        "\tint a;\n" +
        "\ta=10;\n" +
        "\tif(a>0){\n" +
        "\t\ta=1;\n" +
        "\t}\n" +
        "\telse{\n" +
        "\t\ta=2;\n" +
        "\t}\n" +
        "\twhile(a>0){\n" +
        "\t\ta=3;\n" +
        "\t}\n" +
        "}"
    );
    const grammerAnalysis = new GrammarAnalysis();
    grammerAnalysis.grammarAnalyze().then(res => {
      console.log("tokenArray: ", tokenArray);
      const parser = new Parser(tokenArray);
      parser.parsing();
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
