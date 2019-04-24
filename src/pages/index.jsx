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
import { analyze } from "../lib/utils";
import { GrammerAnalysis } from "../lib/grammerAnalysis";
import { Parser } from "../lib/Parser";
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
    const ga = new GrammerAnalysis();
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
