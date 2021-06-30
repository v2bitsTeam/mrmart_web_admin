import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import addCategory from "./addCategory";
import getCategories from "./getCategories";
import { useCategoriesUpdate } from "../../contexts/CategoriesContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const AddCategoryModal = ({
  addCategoryOpen,
  setAddCategoryOpen,
  setAddCategorySuccess,
}) => {
  const updateCategories = useCategoriesUpdate();
  const [categoryName, setCategoryName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const classes = useStyles();

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

  async function getAllCategories() {
    const categories = await getCategories();
    updateCategories(categories);
  }

  const handleImageVerification = (e) => {
    const selected = e.target.files[0];
    if (selected && imageTypes.includes(selected.type)) {
      setImage(selected);
      setImageError("");
    } else {
      setImage(null);
      setImageError("Invalid Image");
    }
  };

  async function handleAddCategorySubmit() {
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
    formData.append("category_name", categoryName);
    formData.append("category_image", image);
    formData.append("featured", featured);

    const response = await addCategory(formData);
    setUploading(false);
    setAddCategorySuccess(false);
    if (response.status) {
      getAllCategories();
      setAddCategoryOpen(false);
      setAddCategorySuccess(true);
      return;
    }
    setUploadError(response.message);
  }

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={addCategoryOpen}
        onClose={() => setAddCategoryOpen(false)}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add New Category
            </Typography>
            <Button color="secondary" onClick={() => setAddCategoryOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
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
              onClick={handleAddCategorySubmit}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={clearInputs}
            >
              Clear
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

export default AddCategoryModal;

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
