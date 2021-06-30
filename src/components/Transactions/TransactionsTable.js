import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import useTable from "../useTable/useTable";
import TransactionsRow from "./TransactionsRow";
import { useTransactions } from "../../contexts/TransactionsContext";

const headCells = [
  { id: "oid", label: "Order ID" },
  { id: "amount", label: "Price" },
  { id: "status", label: "Transaction Status" },
  { id: "payment_type", label: "Payment Type" },
  { id: "payment_status", label: "Payment Status" },
  { id: "created_On", label: "Placed On" },
  // { id: "actions", label: "Actions", disableSorting: true },
];

const TransactionsTable = () => {
  const classes = useStyles();
  const transactions = useTransactions();
  let temporarySearchResults = "";

  const [filteredValues, setFilteredValues] = useState(transactions);

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = transactions?.filter(
      (transactions) =>
        transactions.oid.toLowerCase().includes(search.toLowerCase()) ||
        transactions.status.toLowerCase().includes(search.toLowerCase()) ||
        transactions.payment_type
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transactions.payment_status.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(transactions, headCells, filteredValues, "oid");
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          size="medium"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{<SearchIcon />}</InputAdornment>
            ),
          }}
          onChange={searchFilter}
        />
      </Toolbar>
      {filteredValues ? (
        <>
          <TblContainer width="100%">
            <TblHead />
            <TableBody>
              {transactions &&
                recordsAfterPagingAndSorting().map((transactions) => {
                  return (
                    <TransactionsRow
                      Transaction={transactions}
                      key={transactions.oid}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </>
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default TransactionsTable;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    maxWidth: "90vw",
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "60vw",
  },
}));
