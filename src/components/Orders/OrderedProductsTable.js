import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { mediaUrl } from "../../helpers/Constants";

const OrderedProductsTable = ({ productList }) => {
  const classes = useStyles();

  return (
    <Box margin={1} className={classes.descriptionContainer}>
      <Typography
        className={classes.productDescription}
        variant="h6"
        component="h4"
        gutterBottom
      >
        Products
      </Typography>
      <Table size="small" aria-label="products" className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList &&
            productList.map((product) => {
              return (
                <TableRow key={product.pid}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.productId}
                  >
                    {product.pid}
                  </TableCell>
                  <TableCell className={classes.productImageContainer}>
                    <div
                      className={classes.productImage}
                      style={{
                        background: `url(${mediaUrl}${product.image}) center/contain no-repeat`,
                      }}
                    ></div>
                  </TableCell>
                  <TableCell className={classes.productName}>
                    {product.name}
                  </TableCell>
                  <TableCell className={classes.productPrice}>
                    {product.price}
                  </TableCell>
                  <TableCell className={classes.productItems}>
                    {product.items}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderedProductsTable;

const useStyles = makeStyles({
  productDescription: { textAlign: "center" },
  root: {
    width: "100%",
    "& > *": {
      borderBottom: "unset",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
    },
  },
  productId: {
    width: "25%",
  },
  productImageContainer: {
    width: "25%",
  },
  productImage: {
    width: "120px",
    height: "80px",
    borderRadius: "0.4rem",
  },
  productName: {
    width: "30%",
  },
  productPrice: {
    width: "10%",
  },
  productItems: {
    width: "10%",
  },
});
