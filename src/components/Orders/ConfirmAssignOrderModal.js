import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import assignOrderToDeliveryBoy from "./assignOrderToDeliveryBoy";
import { useOrdersUpdate } from "../../contexts/OrdersContext";
import getOrders from "./getOrders";

const ConfirmAssignOrderModal = ({
  order,
  selectedDeliveryBoyId,
  selectedDeliveryBoyName,
  setAssignOrderOpen,
  confirmAssignOrderOpen,
  setConfirmAssignOrderOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const updateOrders = useOrdersUpdate();

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function getAllOrders() {
    const orders = await getOrders();
    updateOrders(orders);
  }

  async function handleAssignOrder() {
    setLoading(true);
    const response = await assignOrderToDeliveryBoy(
      order.oid,
      selectedDeliveryBoyId
    );
    setLoading(false);
    setShowSnackbar(false);

    if (response.status) {
      order.status = "Order Processing";
      setTimeout(() => {
        updateSnackbar("Order assigned to delivery boy", "success");
      }, 0);
      getAllOrders();
    } else {
      setTimeout(() => {
        updateSnackbar("Something went wrong. Please, try again.", "error");
      }, 0);
    }
    setConfirmAssignOrderOpen(false);
    setAssignOrderOpen(false);
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={confirmAssignOrderOpen}
      onClose={() => setConfirmAssignOrderOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" component="span">
            Are you sure?
          </Typography>
          <Button
            color="secondary"
            onClick={() => setConfirmAssignOrderOpen(false)}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container>
          <Typography align="left" variant="body1" component="h6">
            Do you want to assign order{" "}
            <span
              style={{
                color: "#ef9a9aee",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {order.oid}
            </span>{" "}
            to{" "}
            <span
              style={{
                color: "#80CBC4ee",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              {selectedDeliveryBoyName}?
            </span>
          </Typography>
        </Container>
        <br />
        <div
          className="input-fields-arranger"
          style={
            loading
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : { display: "none" }
          }
        >
          <br />

          <CircularProgress color="secondary" />
          <br />
        </div>
        <Container className={classes.dialogContainer}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading ? true : false}
            size="large"
            startIcon={<CheckIcon />}
            onClick={handleAssignOrder}
            className={classes.flexgroup1}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setConfirmAssignOrderOpen(false)}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmAssignOrderModal;

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2em",
    marginBottom: "2em",
  },
  title: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexgroup1: {
    flex: "auto",
  },
});
