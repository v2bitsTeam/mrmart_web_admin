import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import deleteDeliveryBoy from "./deleteDeliveryBoy";
import { Redirect } from "react-router";

const DeleteDeliveryBoyModal = ({
  deliveryBoyId,
  deliveryBoyName,
  deleteDeliveryBoyOpen,
  setDeleteDeliveryBoyOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [deliveryBoyDeleted, setDeliveryBoyDeleted] = useState(false);

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function handleDeleteDeliveryBoy() {
    setLoading(true);
    setShowSnackbar(false);
    const response = await deleteDeliveryBoy(deliveryBoyId);
    setLoading(false);
    if (response.status) {
      setDeleteDeliveryBoyOpen(false);
      setDeliveryBoyDeleted(true);
    }
    setDeleteDeliveryBoyOpen(false);
    setTimeout(() => {
      updateSnackbar("Something went wrong. Please, try again later.", "error");
    }, 0);
    return;
  }
  if (deliveryBoyDeleted)
    return (
      <Redirect
        to={{
          pathname: "/deliveryBoys",
          state: { from: "delete" },
        }}
      />
    );

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={deleteDeliveryBoyOpen}
      onClose={() => setDeleteDeliveryBoyOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" color="error" component="span">
            Are you sure?
          </Typography>
          <Button
            color="secondary"
            onClick={() => setDeleteDeliveryBoyOpen(false)}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container style={{ marginBottom: "0.5em" }}>
          <Typography align="left" variant="h6" component="h6">
            Delete
          </Typography>
        </Container>
        <Container className={classes.dialogContainer}>
          <TextField
            label="DeliveryBoy Name"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={deliveryBoyName}
            className={classes.flexgroup1}
          />
        </Container>
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
            style={{ backgroundColor: "#b2102f", color: "#fff" }}
            disabled={loading ? true : false}
            size="large"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteDeliveryBoy}
            className={classes.flexgroup1}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setDeleteDeliveryBoyOpen(false)}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDeliveryBoyModal;

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
