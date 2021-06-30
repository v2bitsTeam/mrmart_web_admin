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
import { usePincodes } from "../../contexts/PincodesContext";
import PincodesRow from "./PincodesRow";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import AddPincodeModal from "./AddPincodeModal";

const headCells = [
  { id: "id", label: "Id", disableSorting: true },
  { id: "pincode", label: "Pincode" },
  { id: "address", label: "Address" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const PincodesTable = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const Pincodes = usePincodes();
  const [addPincodeOpen, setAddPincodeOpen] = useState(false);
  const [filteredValues, setFilteredValues] = useState();
  let temporarySearchResults = "";

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = Pincodes.filter(
      (pincode) =>
        pincode.pincode.toLowerCase().includes(search.toLowerCase()) ||
        pincode.address.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  useEffect(() => {
    setFilteredValues(Pincodes);
  }, [Pincodes]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(Pincodes, headCells, filteredValues, "id");

  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Pincodes"
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
            onClick={() => setAddPincodeOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddPincodeModal
            addPincodeOpen={addPincodeOpen}
            setAddPincodeOpen={setAddPincodeOpen}
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
              {Pincodes &&
                recordsAfterPagingAndSorting().map((pincode, index) => {
                  return (
                    <PincodesRow
                      pincode={pincode}
                      index={index + 1}
                      key={pincode.id}
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

export default PincodesTable;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    minWidth: "70vw",
    maxWidth: "80vw",
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
