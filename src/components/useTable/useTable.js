import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";

const useTable = (
  records,
  headCells,
  filteredValues,
  defaultOrderBy,
  resetToZero = false
) => {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  useEffect(() => {
    setPage(0);
  }, [resetToZero]);

  if (records) {
    const emptyRows = records
      ? rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage)
      : 0;

    const TblContainer = (props) => (
      <Table
        className={classes.table}
        style={{ width: props.width, margin: "1rem auto" }}
      >
        {props.children}
      </Table>
    );
    const TblHead = (props) => {
      const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(cellId);
      };

      return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleSortRequest(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const TblPagination = () => (
      <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={pages}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );

    function descendingComparator(a, b, orderBy) {
      let valueA = a[orderBy];
      let valueB = b[orderBy];
      if (
        orderBy === "category_name" ||
        orderBy === "name" ||
        orderBy === "status"
      ) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (orderBy === "featured") {
        valueA = valueA ? valueA.toLowerCase() : "";
        valueB = valueB ? valueB.toLowerCase() : "";
      }
      if (orderBy === "amount" || orderBy === "uid") {
        valueA = +valueA;
        valueB = +valueB;
      }
      if (valueB < valueA) {
        return -1;
      }
      if (valueB > valueA) {
        return 1;
      }
      return 0;
    }

    function getComparator(order, orderBy) {
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    const recordsAfterPagingAndSorting = () =>
      stableSort(filteredValues, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      );

    return {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
      emptyRows,
    };
  } else return <></>;
};

export default useTable;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "480px",
    maxWidth: "1200px",
    marginTop: theme.spacing(3),
    // border: `1px solid ${theme.palette.info.main}`,
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
  },
}));
