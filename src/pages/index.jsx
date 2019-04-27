import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AppContent from "../components/AppContent";
import { Button } from "@material-ui/core";
import { analyze } from "../lib/grammar/utils";
import { GrammarAnalysis } from "../lib/grammar/grammarAnalysis";
import { Parser } from "../lib/grammar/Parser";
import Editor from "react-simple-code-editor";
import dedent from "dedent";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import AnalysisTable from "../components/AnalysisTable";
import withRoot from "../withRoot";
import HeadLine from "../components/HeadLine";
import "./styles.css";
import { MyScanner } from "../lib/semantic/src/scanner";
import { GrammarCompiler } from "../lib/semantic/src/GrammarCompiler";

require("prismjs/components/prism-c");

const styles = theme =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    dense: {
      marginTop: 16
    },
    menu: {
      width: 200
    }
  });

const test = () => {
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
};

test();

class Index extends React.Component {
  state = {
    code: dedent`
    int main() {
      int x = 1;
    }
    `,
    result: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  parse = () => {
    const tokenArray = analyze(this.state.code);
    const ga = new GrammarAnalysis();
    ga.grammarAnalyze().then(res => {
      console.log("tokenArray: ", tokenArray);
      const parser = new Parser(tokenArray);
      parser.parsing().then(result => {
        console.log(result);
        this.setState({ result });
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { code, result } = this.state;

    return (
      <AppContent>
        <div>
          <h1>Grammar Analysis</h1>
          <HeadLine />
          <Button
            variant={"outlined"}
            style={{ width: "100%", margin: "16px 0" }}
            onClick={this.parse}
          >
            Parse
          </Button>
          <div style={{ overflow: "auto", maxHeight: "40vh" }}>
            <Editor
              autoFocus
              placeholder="Type some code…"
              value={this.state.code}
              onValueChange={code => this.setState({ code })}
              highlight={code => highlight(code, languages.c)}
              padding={10}
              className="container__editor"
              style={{
                fontFamily: "Roboto Mono, SF Mono, monospace",
                fontSize: 14,
                backgroundColor: "#f6f8fa"
              }}
            />
          </div>
        </div>
        {result.length > 0 && (
          <AnalysisTable data={result} style={{ flex: 1, overflow: "auto" }} />
        )}
      </AppContent>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
