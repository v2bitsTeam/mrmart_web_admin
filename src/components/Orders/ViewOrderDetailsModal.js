import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import getDeliveryBoy from "../DeliveryBoys/getDeliveryBoy";
import { mediaUrl } from "../../helpers/Constants";

const ViewOrderDetailsModal = ({ order, viewOrderOpen, setViewOrderOpen }) => {
  const classes = useStyles();
  const [deliveryBoyDetails, setDeliveryboyDetails] = useState();

  useEffect(() => {
    async function getdeliveryBoyDetails() {
      if (viewOrderOpen) {
        const response = await getDeliveryBoy(order.deliveryBoy_id);
        if (response) {
          setDeliveryboyDetails(response[0]);
        }
      }
    }

    getdeliveryBoyDetails();

    return () => {};
  }, [viewOrderOpen, order]);
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={viewOrderOpen}
      onClose={() => setViewOrderOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" component="span">
            Order Delivery Details
          </Typography>
          <Button color="secondary" onClick={() => setViewOrderOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container>
          <Typography align="left" variant="h6" component="h6">
            Order{" "}
            <span
              style={{
                color: "#ef9a9aee",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {order.oid}
            </span>{" "}
            {order.status === "delivered Order"
              ? "is delivered by"
              : order.status === "Order Processing"
              ? "is assigned to"
              : "is being delivered by"}
          </Typography>
          <br />
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={"delivery boy pic"}
                className={classes.avatarBg}
                src={
                  deliveryBoyDetails && deliveryBoyDetails.profile_image
                    ? mediaUrl + deliveryBoyDetails?.profile_image
                    : null
                }
              >
                {deliveryBoyDetails?.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={deliveryBoyDetails?.name}
              secondary={deliveryBoyDetails?.mobile}
            />
          </ListItem>
        </Container>
        <br />
        <Container className={classes.dialogContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setViewOrderOpen(false)}
            className={classes.button}
          >
            Ok
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDetailsModal;

const useStyles = makeStyles({
  dialogContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: { width: "150px" },
});
