import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import getDate from "../../helpers/getDate";
import fetchOrderItems from "../Orders/fetchOrderItems";
import OrderedProductsTable from "../Orders/OrderedProductsTable";

const DeliveryBoyOrdersRow = ({ Order }) => {
  const classes = useStyles();

  const [dropDown, setDropDown] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function getOrderItems() {
      const orderItems = await fetchOrderItems(Order.oid);
      setProductList(orderItems);
    }
    getOrderItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Order]);

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
        <TableCell className={classes.orderId}>{Order.oid}</TableCell>
        <TableCell className={classes.orderStatus}>{Order.status}</TableCell>
        <TableCell className={classes.orderPaymentType}>
          {Order.payment_type}
        </TableCell>
        <TableCell className={classes.orderPrice}>
          &#8377; {Order.amount}
        </TableCell>
        <TableCell className={classes.orderItems} align="center">
          {productList?.length ?? "0"}
        </TableCell>
        <TableCell className={classes.orderPlacedOn}>
          {getDate(Order.created_On)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={dropDown} timeout="auto" unmountOnExit>
            <OrderedProductsTable productList={productList} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DeliveryBoyOrdersRow;

const useStyles = makeStyles({
  root: {
    width: "100%",
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
    width: "4%",
  },
  orderId: {
    width: "20%",
  },
  orderStatus: {
    width: "26%",
  },
  orderPaymentType: {
    width: "10%",
  },
  orderPrice: {
    width: "10%",
    minWidth: "50px",
  },
  orderItems: {
    width: "10%",
  },
  orderPlacedOn: {
    width: "20%",
  },
});
