import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const DeliveryBoysRow = ({ DeliveryBoy }) => {
  const classes = useStyles();

  function saveDeliveryBoyToLocalStorage() {
    localStorage.setItem("deliveryBoy", JSON.stringify(DeliveryBoy));
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.deliveryBoyId}>
          {DeliveryBoy.uid}
        </TableCell>
        <TableCell className={classes.deliveryBoyName}>
          {DeliveryBoy.name}
        </TableCell>
        <TableCell className={classes.deliveryBoyMobile}>
          {DeliveryBoy.mobile}
        </TableCell>
        <TableCell className={classes.deliveryBoyAddress}>
          {`${DeliveryBoy.location}, ${DeliveryBoy.city}, ${DeliveryBoy.state}, ${DeliveryBoy.pincode}`}
        </TableCell>
        <TableCell className={classes.actions}>
          <Button
            aria-label="Go to profile page"
            size="medium"
            color="primary"
            onClick={saveDeliveryBoyToLocalStorage}
            to={"/deliveryBoy:" + DeliveryBoy.uid}
            component={Link}
            props={DeliveryBoy.uid}
          >
            View <DoubleArrowIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DeliveryBoysRow;

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
  deliveryBoyId: {
    width: "25%",
  },
  deliveryBoyName: {
    width: "20%",
  },
  deliveryBoyMobile: {
    width: "15%",
  },
  deliveryBoyAddress: {
    width: "40%",
  },
  deliveryBoyActions: {
    width: "10%",
  },
});
