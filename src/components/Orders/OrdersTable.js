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
import OrdersRow from "./OrdersRow";
import { useOrders } from "../../contexts/OrdersContext";

const headCells = [
  { id: "dropDown", label: " ", disableSorting: true },
  { id: "oid", label: "Order ID" },
  { id: "status", label: "Order Status" },
  { id: "payment_type", label: "Payment Type" },
  { id: "amount", label: "Price" },
  { id: "address", label: "Location", disableSorting: true },
  { id: "created_On", label: "Placed On" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const OrdersTable = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const orders = useOrders();
  const [filteredValues, setFilteredValues] = useState(orders);

  let temporarySearchResults = "";

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = orders?.filter(
      (order) =>
        order?.oid?.toLowerCase().includes(search.toLowerCase()) ||
        order?.status?.toLowerCase().includes(search.toLowerCase()) ||
        order?.payment_type?.toLowerCase().includes(search.toLowerCase()) ||
        order?.amount?.toLowerCase().includes(search.toLowerCase()) ||
        order?.location?.toLowerCase().includes(search.toLowerCase()) ||
        order?.city?.toLowerCase().includes(search.toLowerCase()) ||
        order?.state?.toLowerCase().includes(search.toLowerCase()) ||
        order?.pincode?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(orders, headCells, filteredValues, "oid");
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Orders"
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
              {orders &&
                recordsAfterPagingAndSorting().map((order) => {
                  return (
                    <OrdersRow
                      Order={order}
                      key={order.id}
                      setShowSnackbar={setShowSnackbar}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarSeverity={setSnackbarSeverity}
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

export default OrdersTable;

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
