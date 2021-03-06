import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    // minWidth: 700,
    fontFamily: "Roboto Mono, -apple-system, monospace"
  }
});

function CodesTable(props) {
  const { classes, data, ...other } = props;

  return (
    <Paper className={classes.root} {...other}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Three address code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ key, value }) => (
            <TableRow key={Math.random()}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CodesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(CodesTable);
