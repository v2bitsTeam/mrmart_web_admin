import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { dangerColor, mediaUrl } from "../../helpers/Constants";
import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";

const ProductsRow = ({
  Product,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.dropDown}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setDropDown(!dropDown)}
          >
            {dropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.productId}>{Product.pid}</TableCell>
        <TableCell className={classes.productName}>{Product.name}</TableCell>
        <TableCell className={classes.productPrice}>
          &#8377;{Product.price}
        </TableCell>
        <TableCell className={classes.productDiscount}>
          {Product.discount ?? 0}
        </TableCell>
        <TableCell className={classes.productQuantity}>
          {Product.instock}
        </TableCell>
        <TableCell className={classes.featured}>
          {Product.featured === "true" || Product.featured === "yes" ? (
            <StarIcon className={classes.starIcon} />
          ) : (
            <StarBorderIcon className={classes.starIcon} />
          )}
        </TableCell>

        <TableCell className={classes.actions}>
          <IconButton
            aria-label="edit user details"
            size="medium"
            color="primary"
            onClick={() => setEditProductOpen(true)}
          >
            <EditIcon />
          </IconButton>
          <EditProductModal
            product={Product}
            editProductOpen={editProductOpen}
            setEditProductOpen={setEditProductOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
          <IconButton
            aria-label="edit user details"
            size="medium"
            style={{ color: dangerColor }}
            onClick={() => setDeleteProductOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
          <DeleteProductModal
            productId={Product.pid}
            productName={Product.name}
            deleteProductOpen={deleteProductOpen}
            setDeleteProductOpen={setDeleteProductOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={dropDown} timeout="auto" unmountOnExit>
            <Box margin={1} className={classes.descriptionContainer}>
              <div
                className={classes.productImage}
                style={{
                  background: `url(${mediaUrl}${Product.image}) center/contain no-repeat`,
                }}
              ></div>

              <Typography
                className={classes.productDescription}
                variant="h4"
                component="h4"
                gutterBottom
              >
                {Product.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductsRow;

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
  dropDown: {
    width: "5%",

    // maxWidth: "50px",
  },
  productId: {
    width: "25%",
  },
  productName: {
    width: "25%",
  },
  productPrice: {
    width: "10%",
  },
  productDiscount: {
    width: "10%",
  },
  productQuantity: {
    width: "10%",
  },
  featured: {
    width: "5%",
    // maxWidth: "50px",
  },
  actions: {
    width: "10%",
    display: "flex",
  },

  starIcon: {
    color: dangerColor,
  },
  descriptionContainer: {
    display: "flex",
    alignItems: "center",
  },
  productImage: {
    width: "120px",
    height: "80px",
    borderRadius: "0.4rem",
  },
  productDescription: {
    paddingLeft: "0.5rem",
    fontSize: "16px",
  },
});
