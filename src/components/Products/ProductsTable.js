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
import { useProducts } from "../../contexts/ProductsContext";
import ProductsRow from "./ProductsRow";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import AddProductModal from "./AddProductModal";

const headCells = [
  { id: "dropDown", label: " ", disableSorting: true },
  { id: "pid", label: "Product Id" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "discount", label: "Discount (%)" },
  { id: "quantity", label: "In Stock", disableSorting: true },
  { id: "featured", label: "Featured" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ProductsTable = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const products = useProducts();
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [resetToZero, setResetToZero] = useState(false);
  let temporarySearchResults = "";

  const [filteredValues, setFilteredValues] = useState();
  let searchFilter = (e) => {
    let search = e.target.value;
    if (search.length === 1) {
      setResetToZero(!resetToZero);
    }
    temporarySearchResults = products.filter(
      (product) =>
        product.pid.toLowerCase().includes(search.toLowerCase()) ||
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  useEffect(() => {
    setFilteredValues(products);
  }, [products]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    emptyRows,
  } = useTable(products, headCells, filteredValues, "name", resetToZero);
  return (
    <Paper className={classes.pageContent}>
      <Toolbar className={classes.toolbar}>
        <TextField
          label="Search Products"
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
            onClick={() => setAddProductOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddProductModal
            addProductOpen={addProductOpen}
            setAddProductOpen={setAddProductOpen}
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
              {products &&
                recordsAfterPagingAndSorting().map((product) => {
                  return (
                    <ProductsRow
                      Product={product}
                      key={product.id}
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

export default ProductsTable;

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
