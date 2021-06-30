import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import addDeliveryBoy from "./addDeliveryBoy";
import getDeliveryBoys from "./getDeliveryBoys";
import { useDeliveryBoysUpdate } from "../../contexts/DeliveryBoysContext";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const AddDeliveryBoy = ({
  addDeliveryBoyOpen,
  setAddDeliveryBoyOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const updateDeliveryBoys = useDeliveryBoysUpdate();
  const [deliveryBoyName, setDeliveryBoyName] = useState("");
  const [deliveryBoyMobile, setDeliveryBoyMobile] = useState("");
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState("");
  const [deliveryBoyCity, setDeliveryBoyCity] = useState("");
  const [deliveryBoyState, setDeliveryBoyState] = useState("");
  const [deliveryBoyPinCode, setDeliveryBoyPinCode] = useState("");
  const [deliveryBoyPassword, setDeliveryBoyPassword] = useState("");
  const [image, setImage] = useState(null);
  const [deliveryBoyNameError, setDeliveryBoyNameError] = useState("");
  const [deliveryBoyMobileError, setDeliveryBoyMobileError] = useState("");
  const [deliveryBoyLocationError, setDeliveryBoyLocationError] = useState("");
  const [deliveryBoyCityError, setDeliveryBoyCityError] = useState("");
  const [deliveryBoyStateError, setDeliveryBoyStateError] = useState("");
  const [deliveryBoyPinCodeError, setDeliveryBoyPinCodeError] = useState("");
  const [deliveryBoyPasswordError, setDeliveryBoyPasswordError] = useState("");
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const classes = useStyles();

  const handleImageVerification = (e) => {
    const selected = e.target.files[0];
    if (selected && imageTypes.includes(selected.type)) {
      setImage(selected);
      setImageError("");
    } else {
      setImage(null);
      setImageError("Invalid File");
    }
  };

  const clearInputs = () => {
    setDeliveryBoyName("");
    setDeliveryBoyMobile("");
    setDeliveryBoyLocation("");
    setDeliveryBoyCity("");
    setDeliveryBoyState("");
    setDeliveryBoyPinCode("");
    setDeliveryBoyPassword("");
    setImage(null);
  };

  const clearErrors = () => {
    setDeliveryBoyNameError(null);
    setDeliveryBoyMobileError(null);
    setDeliveryBoyLocationError(null);
    setDeliveryBoyCityError(null);
    setDeliveryBoyStateError(null);
    setDeliveryBoyPinCodeError(null);
    setDeliveryBoyPasswordError(null);
    setImageError(null);
  };

  async function getAllDeliveryBoys() {
    const DeliveryBoys = await getDeliveryBoys();
    updateDeliveryBoys(DeliveryBoys);
  }

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function handleAddDeliveryBoySubmit() {
    let validString = /^[a-zA-Z][a-zA-Z\s][a-zA-Z\s]*$/;

    if (deliveryBoyName.length === 0) {
      setDeliveryBoyNameError("DeliveryBoy name is required");
      return;
    }
    if (!deliveryBoyName.match(validString)) {
      setDeliveryBoyNameError("DeliveryBoy name is required");
      return;
    }
    if (deliveryBoyMobile.length === 0) {
      setDeliveryBoyMobileError("Mobile Number is required");
      return;
    }
    if (isNaN(deliveryBoyMobile) || deliveryBoyMobile.length !== 10) {
      setDeliveryBoyMobileError("Invalid Mobile Number");
      return;
    }
    if (deliveryBoyPassword.length === 0) {
      setDeliveryBoyPasswordError("Password is required");
      return;
    }
    if (deliveryBoyLocation.length === 0) {
      setDeliveryBoyLocationError("Address is required");
      return;
    }
    if (deliveryBoyLocation.length < 5) {
      setDeliveryBoyLocationError("Please, enter valid address");
      return;
    }
    if (deliveryBoyCity.length === 0) {
      setDeliveryBoyCityError("City is required");
      return;
    }
    if (!deliveryBoyCity.match(validString)) {
      setDeliveryBoyCityError("Please, enter valid city");
      return;
    }
    if (deliveryBoyState.length === 0) {
      setDeliveryBoyStateError("State is required");
      return;
    }
    if (!deliveryBoyState.match(validString)) {
      setDeliveryBoyStateError("Please, enter valid state");
      return;
    }
    if (!deliveryBoyPinCode.length === 0) {
      setDeliveryBoyPinCodeError("Pincode is required");
      return;
    }
    if (isNaN(deliveryBoyPinCode)) {
      setDeliveryBoyStateError("Please, enter valid pincode");
      return;
    }
    clearInputs();
    setUploading(true);
    const formData = new FormData();
    formData.append("name", deliveryBoyName);
    formData.append("mobile", deliveryBoyMobile);
    formData.append("location", deliveryBoyLocation);
    formData.append("city", deliveryBoyCity);
    formData.append("state", deliveryBoyState);
    formData.append("pincode", deliveryBoyPinCode);
    formData.append("password", deliveryBoyPassword);
    formData.append("profile_image", image);

    const response = await addDeliveryBoy(formData);
    setUploading(false);
    setShowSnackbar(false);

    if (response.status) {
      getAllDeliveryBoys();
      setAddDeliveryBoyOpen(false);
      setTimeout(() => {
        updateSnackbar("Delivery Boy added successfully", "success");
      }, 0);
      return;
    }
    setTimeout(() => {
      updateSnackbar(response.message, "error");
    }, 0);
  }

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        open={addDeliveryBoyOpen}
        onClose={() => setAddDeliveryBoyOpen(false)}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add New Delivery Boy
            </Typography>
            <Button
              color="secondary"
              onClick={() => setAddDeliveryBoyOpen(false)}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Delivery Boy Name"
              variant="outlined"
              value={deliveryBoyName}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyNameError ? true : false}
              helperText={deliveryBoyNameError}
              onClick={clearErrors}
              fullWidth
              onChange={(e) => setDeliveryBoyName(e.target.value)}
            />
          </Container>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Delivery Boy Mobile Number"
              variant="outlined"
              value={deliveryBoyMobile}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyMobileError ? true : false}
              helperText={deliveryBoyMobileError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyMobile(e.target.value)}
            />
            <TextField
              required
              label="Delivery Boy Password"
              variant="outlined"
              value={deliveryBoyPassword}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyPasswordError ? true : false}
              helperText={deliveryBoyPasswordError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyPassword(e.target.value)}
            />
          </Container>

          <Container className={classes.dialogContainer}>
            <TextField
              className={classes.addImage}
              label="Add Image"
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              size="medium"
              value={image ? image.name : " "}
            />

            <Button
              variant="contained"
              component="label"
              className={classes.button}
              color="primary"
              size="large"
              startIcon={<PhotoCameraIcon />}
              onClick={clearErrors}
            >
              Add
              <input
                accept="image/*"
                className={classes.input}
                id="image-upload"
                type="file"
                onChange={handleImageVerification}
                hidden
              />
            </Button>
          </Container>
          <div className="input-fields-arranger">
            <Typography color="error" align="left">
              {imageError}
            </Typography>
            <br />
          </div>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Delivery Boy Address"
              variant="outlined"
              value={deliveryBoyLocation}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyLocationError ? true : false}
              helperText={deliveryBoyLocationError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyLocation(e.target.value)}
            />
            <TextField
              required
              label="Delivery Boy City"
              variant="outlined"
              value={deliveryBoyCity}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyCityError ? true : false}
              helperText={deliveryBoyCityError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyCity(e.target.value)}
            />
          </Container>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Delivery Boy State"
              variant="outlined"
              value={deliveryBoyState}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyStateError ? true : false}
              helperText={deliveryBoyStateError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyState(e.target.value)}
            />
            <TextField
              required
              label="Delivery Boy Pincode"
              variant="outlined"
              value={deliveryBoyPinCode}
              size="medium"
              className={classes.flexgroup1}
              error={deliveryBoyPinCodeError ? true : false}
              helperText={deliveryBoyPinCodeError}
              onClick={clearErrors}
              onChange={(e) => setDeliveryBoyPinCode(e.target.value)}
            />
          </Container>
          <div
            className="input-fields-arranger"
            style={uploading ? { display: "block" } : { display: "none" }}
          >
            <br />
            <LinearProgress />
            <br />
          </div>
          <Container className={classes.dialogContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={uploading ? true : false}
              startIcon={<AddIcon />}
              onClick={handleAddDeliveryBoySubmit}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                clearInputs();
                clearErrors();
              }}
            >
              Clear
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDeliveryBoy;

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "2em",
    marginBottom: "2em",
  },
  title: {
    display: "flex",
  },
  flexgroup1: {
    flex: "auto",
  },
  addImage: {
    width: "100%",
  },
});
