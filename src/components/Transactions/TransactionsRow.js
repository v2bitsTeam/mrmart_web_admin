import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import getDate from "../../helpers/getDate";

const TransactionsRow = ({ Transaction }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.transactionId}>
          {Transaction.oid}
        </TableCell>
        <TableCell className={classes.transactionPrice}>
          &#8377; {Transaction.amount}
        </TableCell>
        <TableCell className={classes.transactionStatus}>
          {Transaction.status}
        </TableCell>
        <TableCell className={classes.transactionPaymentType}>
          {Transaction.payment_type}
        </TableCell>
        <TableCell className={classes.transactionPaymentStatus}>
          {Transaction.payment_status}
        </TableCell>
        <TableCell className={classes.transactionPlacedOn}>
          {getDate(Transaction.created_On)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TransactionsRow;

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& > *": {
      btransactionBottom: "unset",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#efefef",
    },
  },
  transactionId: {
    width: "20%",
  },
  transactionPrice: {
    width: "15%",
    minWidth: "50px",
  },
  transactionStatus: {
    width: "20%",
  },
  transactionPaymentType: {
    width: "15%",
  },
  transactionPaymentStatus: {
    width: "15%",
  },
  transactionPlacedOn: {
    width: "15%",
  },
});
