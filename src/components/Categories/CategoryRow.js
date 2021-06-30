import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { dangerColor } from "../../helpers/Constants";

const CategoryRow = ({ Category }) => {
  const classes = useStyles();

  function saveCategoryToLocalStorage() {
    localStorage.setItem("category", JSON.stringify(Category));
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.categoryId}>{Category.cid}</TableCell>
        <TableCell className={classes.categoryName}>
          {Category.category_name}
        </TableCell>
        <TableCell className={classes.addtoFeatured}>
          {Category.featured === "true" || Category.featured === true ? (
            <StarIcon className={classes.starIcon} />
          ) : (
            <StarBorderIcon className={classes.starIcon} />
          )}
        </TableCell>

        <TableCell className={classes.actions}>
          <Button
            aria-label="Go to products page"
            size="medium"
            color="primary"
            onClick={saveCategoryToLocalStorage}
            to={"/products:" + Category.cid}
            component={Link}
            props={Category.cid}
          >
            View <DoubleArrowIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CategoryRow;

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#efefef",
    },
  },
  categoryId: {
    width: "20%",
  },
  categoryName: {
    width: "50%",
  },
  addtoFeatured: {
    width: "10%",
  },
  actions: {
    width: "20%",
  },
  starIcon: {
    color: dangerColor,
  },
});
