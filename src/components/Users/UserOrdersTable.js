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
import UserOrdersRow from "./UserOrdersRow";
import { useUserOrders } from "../../contexts/UserOrdersContext";

const headCells = [
  { id: "dropDown", label: " ", disableSorting: true },
  { id: "oid", label: "Order ID" },
  { id: "status", label: "Order Status" },
  { id: "payment_type", label: "Payment Type" },
  { id: "amount", label: "Price" },
  { id: "no_of_items", label: "Items", disableSorting: true },
  { id: "created_On", label: "Placed On" },
];

const UserOrdersTable = () => {
  const classes = useStyles();
  const userOrders = useUserOrders();
  let temporarySearchResults = "";

  const [filteredValues, setFilteredValues] = useState(userOrders);

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = userOrders.filter(
      (userOrder) =>
        userOrder.status.toLowerCase().includes(search.toLowerCase()) ||
        userOrder.oid.toLowerCase().includes(search.toLowerCase()) ||
        userOrder.amount.toLowerCase().includes(search.toLowerCase()) ||
        userOrder.payment_type.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(userOrders, headCells, filteredValues, "oid");
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search User Orders"
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
              {userOrders &&
                recordsAfterPagingAndSorting().map((order) => {
                  return <UserOrdersRow Order={order} key={order.oid} />;
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

export default UserOrdersTable;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    maxWidth: "90vw",
    minWidth: "70vw",
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "60vw",
  },
}));
