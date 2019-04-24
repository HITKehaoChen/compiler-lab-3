import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { GrammerAnalysis } from "./lib/grammerAnalysis";
// import { analyze } from "./lib/utils";
import { Parser } from "./lib/Parser";
import { analyze } from "./lib/utils";
import { GrammerAnalysis } from "./lib/grammerAnalysis";
// @ts-ignore

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
    const grammerAnalysis = new GrammerAnalysis();
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
