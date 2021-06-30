import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import acceptOrder from "./acceptOrder";
import getOrders from "./getOrders";
import { useOrdersUpdate } from "../../contexts/OrdersContext";

const AcceptOrderModal = ({
  order,
  acceptOrderOpen,
  setAcceptOrderOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const updateOrders = useOrdersUpdate();
  const [loading, setLoading] = useState(false);

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }
  async function getAllOrders() {
    const orders = await getOrders();
    updateOrders(orders);
  }

  async function handleAcceptOrder() {
    setLoading(true);
    const response = await acceptOrder(order.oid);
    setLoading(false);
    setShowSnackbar(false);
    if (response.status) {
      order.status = "Order Accepted";
      setTimeout(() => {
        updateSnackbar("Order has been accepted", "success");
      }, 0);
      getAllOrders();
    } else {
      setTimeout(() => {
        updateSnackbar("Something went wrong. Please, try again.", "error");
      }, 0);
    }
    setAcceptOrderOpen(false);
  }

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={acceptOrderOpen}
      onClose={() => setAcceptOrderOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" color="error" component="span">
            Are you sure?
          </Typography>
          <Button color="secondary" onClick={() => setAcceptOrderOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container style={{ marginBottom: "0.5em" }}>
          <Typography align="left" variant="h6" component="h6">
            Accept Order
          </Typography>
        </Container>
        <Container className={classes.dialogContainer}>
          <TextField
            label="Order Id"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={order.oid}
            className={classes.flexgroup1}
          />
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
            onClick={handleAcceptOrder}
            className={classes.flexgroup1}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setAcceptOrderOpen(false)}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptOrderModal;

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2em",
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
