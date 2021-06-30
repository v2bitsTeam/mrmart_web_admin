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
import Button from "@material-ui/core/Button";
import useTable from "../useTable/useTable";
import { useCategories } from "../../contexts/CategoriesContext";
import CategoryRow from "./CategoryRow";
import AddCategoryModal from "./AddCategoryModal";
import QueueIcon from "@material-ui/icons/Queue";

const headCells = [
  { id: "cid", label: "Category Id" },
  { id: "category_name", label: "Category" },
  { id: "featured", label: "Featured" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const CategoriesTable = ({ setAddCategorySuccess }) => {
  const classes = useStyles();
  const categories = useCategories();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [resetToZero, setResetToZero] = useState(false);
  let temporarySearchResults = "";

  const [filteredValues, setFilteredValues] = useState();
  let searchFilter = (e) => {
    let search = e.target.value;
    if (search.length === 1) {
      setResetToZero(!resetToZero);
    }
    temporarySearchResults = categories.filter(
      (category) =>
        category.cid.toLowerCase().includes(search.toLowerCase()) ||
        category.category_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  useEffect(() => {
    setFilteredValues(categories);
  }, [categories]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(
    categories,
    headCells,
    filteredValues,
    "category_name",
    resetToZero
  );
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Category"
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
            onClick={() => setAddCategoryOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddCategoryModal
            addCategoryOpen={addCategoryOpen}
            setAddCategoryOpen={setAddCategoryOpen}
            setAddCategorySuccess={setAddCategorySuccess}
          />
        </div>
      </Toolbar>
      {filteredValues ? (
        <>
          <TblContainer width="100%">
            <TblHead />
            <TableBody>
              {categories &&
                recordsAfterPagingAndSorting().map((category) => {
                  return <CategoryRow Category={category} key={category.id} />;
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

export default CategoriesTable;

const useStyles = makeStyles((theme) => ({
  pageContent: {
    maxWidth: "80vw",
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  toolbar: {
    width: "60vw",
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  searchInput: {
    width: "40vw",
    minWidth: "200px",
  },

  button: {
    width: "150px",
    height: "55px",
  },
}));
