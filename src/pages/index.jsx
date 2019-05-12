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
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CodesTable from "../components/CodesTable";
import IdTable from "../components/IdTable";

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
    code: `
int main(){
  int a;
  a = 10;

  if (a > 0){
    a = 1;
  } else {
    a = 2;
  }
  while (a > 0){
    a = 3;
  }
}
    `,
    result: [],
    codes: [],
    ids: []
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  semantic = () => {
    const scan = new MyScanner(this.state.code);
    const tokenList = scan.execute();
    console.log(tokenList.length);
    console.log(tokenList);
    const gc = new GrammarCompiler();

    gc.analysis(tokenList);

    const codes = gc.getCodes();
    codes.push("END");

    console.log("codes", codes);

    const res = codes.map((value, key) => ({ key, value }));
    this.setState({ codes: res });

    const ids = gc.getIds().map(id => ({
      name: id.name,
      type: id.type,
      length: id.length,
      memAddr: id.offset
    }));
    this.setState({ ids });
  };

  parse = () => {
    const tokenArray = analyze(this.state.code);
    const ga = new GrammarAnalysis();
    return ga.grammarAnalyze().then(res => {
      // console.log("tokenArray: ", tokenArray);
      const parser = new Parser(tokenArray);
      parser.parsing().then(result => {
        console.log(result);
        this.setState({ result });
      });
    });
  };

  reset = () => {
    this.setState({ result: [], codes: [] });
  };

  run = () => {
    this.parse()
      .then(this.semantic)
      .catch(e => {
        alert("Something wrong: " + e);
      });
  };

  componentDidMount() {
    this.run();
  }

  render() {
    const { classes } = this.props;
    const { code, result, codes, ids } = this.state;

    return (
      <AppContent>
        <div>
          {/*<HeadLine />*/}
          {/*<div style={{ marginTop: 12, overflow: "auto", maxHeight: "30vh" }}>*/}
          <Grid
            container
            spacing={8}
            style={{ marginTop: 12, overflow: "auto", maxHeight: "30vh" }}
          >
            <Grid item xs={12} sm={8} style={{ overflow: "auto" }}>
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
            </Grid>
            <Grid item xs={12} sm={4} style={{ overflow: "auto" }}>
              {ids.length > 0 && <IdTable data={ids} />}
            </Grid>
          </Grid>

          {/*</div>*/}
          <Button
            variant={"outlined"}
            style={{ width: "66.66667%", margin: "16px 0" }}
            onClick={this.run}
          >
            RUN
          </Button>
        </div>

        <Grid container spacing={8} style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={8} style={{ overflow: "auto" }}>
            {result.length > 0 && <AnalysisTable data={result} />}
          </Grid>
          <Grid item xs={12} sm={4} style={{ overflow: "auto" }}>
            {codes.length > 0 && <CodesTable data={codes} />}
          </Grid>
          {/*<Grid item xs={12} sm={4} style={{ overflow: "auto" }}>*/}
          {/*  {ids.length > 0 && <IdTable data={ids} />}*/}
          {/*</Grid>*/}
        </Grid>
      </AppContent>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
