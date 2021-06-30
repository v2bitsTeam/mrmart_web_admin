import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import getDate from "../../helpers/getDate";
import fetchOrderItems from "./fetchOrderItems";
import OrderedProductsTable from "./OrderedProductsTable";
import OrderActions from "./OrderActions";

const OrdersRow = ({
  Order,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState(false);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (dropDown) {
      getOrderItems(mounted);
    }
    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDown]);

  async function getOrderItems(mounted) {
    if (Order.oid) {
      const orderItems = await fetchOrderItems(Order.oid);
      if (mounted) setProductList(orderItems);
    }
  }

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
        <TableCell
          className={classes.orderAddress}
        >{`${Order.location}, ${Order.city} , ${Order.state}, ${Order.pincode}`}</TableCell>
        <TableCell className={classes.orderPlacedOn}>
          {getDate(Order.created_On)}
        </TableCell>
        <TableCell className={classes.actions}>
          <OrderActions
            Order={Order}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
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

export default OrdersRow;

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
    width: "10%",
  },
  orderStatus: {
    width: "20%",
  },
  orderPaymentType: {
    width: "8%",
  },
  orderPrice: {
    width: "10%",
    minWidth: "50px",
  },
  orderAddress: {
    width: "28%",
  },
  orderPlacedOn: {
    width: "10%",
  },
  actions: {
    width: "10%",
    minWidth: "50px",
  },
});
