import React, { useState, useEffect } from "react";
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
import DeliveryBoysRow from "./DeliveryBoysRow";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import AddDeliveryBoyModal from "./AddDeliveryBoyModal";
import { useDeliveryBoys } from "../../contexts/DeliveryBoysContext";

const headCells = [
  { id: "uid", label: "DeliveryBoy Id" },
  { id: "name", label: "Name" },
  { id: "mobile", label: "Mobile" },
  { id: "address", label: "Address", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const DeliveryBoysTable = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const deliveryBoys = useDeliveryBoys();
  const [filteredValues, setFilteredValues] = useState();
  const [addDeliveryBoyOpen, setAddDeliveryBoyOpen] = useState(false);

  let temporarySearchResults = "";

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = deliveryBoys.filter(
      (deliveryBoy) =>
        deliveryBoy.id.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.name.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.location.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.city.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.state.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.pincode.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.mobile.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  useEffect(() => {
    setFilteredValues(deliveryBoys);
  }, [deliveryBoys]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(deliveryBoys, headCells, filteredValues, "name");
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Delivery Boys"
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
        <div className={classes.button}>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            className={classes.button}
            onClick={() => setAddDeliveryBoyOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddDeliveryBoyModal
            addDeliveryBoyOpen={addDeliveryBoyOpen}
            setAddDeliveryBoyOpen={setAddDeliveryBoyOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
      </Toolbar>
      {filteredValues ? (
        <>
          <TblContainer width="100%">
            <TblHead />
            <TableBody>
              {deliveryBoys &&
                recordsAfterPagingAndSorting().map((deliveryBoy) => {
                  return (
                    <DeliveryBoysRow
                      DeliveryBoy={deliveryBoy}
                      key={deliveryBoy.id}
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

export default DeliveryBoysTable;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    minWidth: "70vw",
    maxWidth: "90vw",

    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  toolbar: {
    width: "70vw",
    display: "flex",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "40vw",
  },
  button: {
    width: "150px",
    height: "55px",
  },
}));
