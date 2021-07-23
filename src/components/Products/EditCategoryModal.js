import React, { useState } from "react";
import { Redirect } from "react-router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import editCategory from "./editCategory";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { mediaUrl } from "../../helpers/Constants";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const EditCategoryModal = ({
  category,
  editCategoryOpen,
  setEditCategoryOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const [categoryName, setCategoryName] = useState(category.category_name);
  const [featured, setFeatured] = useState(
    category.featured === "true" ? true : false
  );
  const [image, setImage] = useState(mediaUrl + category.category_image);
  const [imageFile, setImageFile] = useState(null);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [categoryEdited, setCategoryEdited] = useState(false);

  const classes = useStyles();

  function resetInputs() {
    setCategoryName(category.category_name);
    setImage(mediaUrl + category.category_image);
    setFeatured(
      category.featured === "true" || category.featured === true ? true : false
    );
    setImageFile(null);
  }

  function handleClose() {
    resetInputs();
    clearErrors();
    setEditCategoryOpen(false);
  }

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  const clearInputs = () => {
    setCategoryName("");
    setFeatured(false);
    setImage(null);
  };

  const clearErrors = () => {
    setCategoryNameError(null);
    setImageError(null);
    setUploadError(null);
  };

  const handleImageVerification = (e) => {
    setImageError("");
    const selected = e.target.files[0];
    const imageReader = new FileReader();
    imageReader.onload = () => {
      if (imageReader.readyState === 2) {
        setImage(imageReader.result);
      }
    };

    selected && imageReader.readAsDataURL(selected);
    if (selected && imageTypes.includes(selected.type)) {
      setImageFile(selected);
      setImageError("");
    } else {
      setImageFile(null);
      setImageError("Invalid Image");
    }
  };

  async function handleUpdateCategorySubmit() {
    let tempImage = image.split("/");
    let tempFeatured = category.featured === "true" ? true : false;

    if (
      categoryName === category.category_name &&
      tempImage[tempImage.length - 1] === category.category_image &&
      featured === tempFeatured
    ) {
      setShowSnackbar(false);
      setEditCategoryOpen(false);
      setTimeout(() => {
        updateSnackbar("Nothing to update", "warning");
      }, 0);
      return;
    }
    if (categoryName.length === 0) {
      setCategoryNameError("Category name is required");
      return;
    }
    if (!image) {
      setImageError("Image can't be empty");
      return;
    }
    clearInputs();
    setUploading(true);

    const formData = new FormData();

    formData.append("cid", category.cid);
    formData.append("category_name", categoryName);
    formData.append("featured", featured);

    if (imageFile) {
      formData.append("imageEdited", true);
      formData.append("oldimage", category.category_image);
      formData.append("category_image", imageFile);
    }

    const response = await editCategory(formData);
    setUploading(false);
    setShowSnackbar(false);

    if (response.status) {
      setEditCategoryOpen(false);
      setCategoryEdited(true);
      return;
    }
    setTimeout(() => {
      updateSnackbar(response.message, "error");
    }, 0);
  }

  if (categoryEdited)
    return (
      <Redirect
        to={{
          pathname: "/categories",
          state: { fromLocation: "edit" },
        }}
      />
    );
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={editCategoryOpen}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Edit Category
            </Typography>
            <Button color="secondary" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Container className={classes.imageDialogContainer}>
            <div
              style={{
                background: `url(${image}) center/contain no-repeat`,
              }}
              className={classes.imageContainer}
            ></div>
            <Button
              variant="text"
              component="label"
              className={classes.button}
              color="primary"
              size="small"
              startIcon={<PhotoCameraIcon />}
              onClick={clearErrors}
            >
              change Image
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
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Category Name"
              variant="outlined"
              value={categoryName}
              size="medium"
              className={classes.flexgroup1}
              error={categoryNameError ? true : false}
              helperText={categoryNameError}
              onClick={clearErrors}
              fullWidth
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <FormControlLabel
              labelPlacement="top"
              label="Featured"
              control={
                <Switch
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  name="Featured"
                />
              }
            />
          </Container>

          <div className="input-fields-arranger">
            <Typography color="error" align="left">
              {imageError}
            </Typography>
            <br />
          </div>

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
              startIcon={<CheckIcon />}
              onClick={handleUpdateCategorySubmit}
            >
              Update
            </Button>
          </Container>
        </DialogContent>
        {uploadError && (
          <CustomSnackbar message={uploadError} severity={"error"} />
        )}
      </Dialog>
    </>
  );
};

export default EditCategoryModal;

const useStyles = makeStyles((theme) => ({
  imageDialogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "0.5em",
    marginBottom: "1em",
  },
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1em",
    marginBottom: "1em",
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "0.25rem",
    boxShadow: "2px 4px 8px #3334",
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
}));
