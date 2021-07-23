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
import { useUsers } from "../../contexts/UsersContext";
import UsersRow from "./UsersRow";

const headCells = [
  { id: "uid", label: "User ID" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "address", label: "Address", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const UsersTable = () => {
  const classes = useStyles();
  const users = useUsers();
  let temporarySearchResults = "";

  const [filteredValues, setFilteredValues] = useState(users);

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.mobile.toLowerCase().includes(search.toLowerCase()) ||
        user.location.toLowerCase().includes(search.toLowerCase()) ||
        user.city.toLowerCase().includes(search.toLowerCase()) ||
        user.state.toLowerCase().includes(search.toLowerCase()) ||
        user.pincode.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(users, headCells, filteredValues, "registered_shop_id");
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Users"
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
              {users &&
                recordsAfterPagingAndSorting().map((user, index) => {
                  return (
                    <UsersRow User={user} key={user.id} Index={index + 1} />
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

export default UsersTable;

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
