import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import deletePincode from "./deletePincode";
import getPincodes from "./getPincodes";
import { usePincodesUpdate } from "../../contexts/PincodesContext";

const DeletePincodeModal = ({
  pincodeId,
  pincode,
  address,
  deletePincodeOpen,
  setDeletePincodeOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const updatePincodes = usePincodesUpdate();

  async function getAllPincodes() {
    const Pincodes = await getPincodes();
    updatePincodes(Pincodes.filter((pincode) => pincode.pincode !== pincode));
  }

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function handleDeletePincode() {
    setLoading(true);
    setShowSnackbar(false);
    const response = await deletePincode(pincodeId);
    setLoading(false);
    if (response.status) {
      getAllPincodes();
      setTimeout(() => {
        updateSnackbar("Pincode deleted successfully", "success");
      }, 0);
      setDeletePincodeOpen(false);
      return;
    }
    setDeletePincodeOpen(false);
    setTimeout(() => {
      updateSnackbar("Something went wrong. Please, try again later.", "error");
    }, 0);
    return;
  }

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={deletePincodeOpen}
      onClose={() => setDeletePincodeOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" color="error" component="span">
            Are you sure?
          </Typography>
          <Button color="secondary" onClick={() => setDeletePincodeOpen(false)}>
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
            label="Pincode"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={`${pincode} - ${address}`}
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
            onClick={handleDeletePincode}
            className={classes.flexgroup1}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setDeletePincodeOpen(false)}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePincodeModal;

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
