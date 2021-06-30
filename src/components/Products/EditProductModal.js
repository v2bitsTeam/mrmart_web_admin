import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import editProduct from "./editProduct";
import getProducts from "./getProducts";
import { useProductsUpdate } from "../../contexts/ProductsContext";
import { mediaUrl } from "../../helpers/Constants";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const EditProductModal = ({
  product,
  editProductOpen,
  setEditProductOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const updateProducts = useProductsUpdate();
  const categoryId = JSON.parse(localStorage.getItem("category")).cid;
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productQuantity, setProductQuantity] = useState(product.instock);
  const [productDiscount, setProductDiscount] = useState(product.discount);
  const [image, setImage] = useState(mediaUrl + product.image);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [featured, setFeatured] = useState(
    product.featured === "true" ? true : false
  );
  const [imageFile, setImageFile] = useState(null);
  const [productNameError, setProductNameError] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [productPriceError, setProductPriceError] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const classes = useStyles();
  const clearInputs = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setImage(null);
  };

  function resetInputs() {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductQuantity(product.instock);
    setProductDiscount(product.discount);
    setImage(mediaUrl + product.image);
    setProductDescription(product.description);
    setFeatured(product.featured === "true" ? true : false);
    setImageFile(null);
  }

  function handleClose() {
    resetInputs();
    clearErrors();
    setEditProductOpen(false);
  }

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  const clearErrors = () => {
    setProductNameError(null);
    setProductDescriptionError(null);
    setProductPriceError(null);
    setProductQuantityError(null);
    setImageError(null);
    setUploadError(null);
  };

  async function getAllProducts() {
    const products = await getProducts(categoryId);
    updateProducts(products);
  }

  function updateQuantity(value) {
    if (value === "") {
      setProductQuantity(1);
      return;
    }
    if (!value) {
      setProductQuantity(1);
      return;
    }
    setProductQuantity(value);
  }

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

  async function handleEditProductSubmit() {
    let tempImage = image.split("/");
    let tempFeatured = product.featured === "true" ? true : false;

    if (
      productName === product.name &&
      productPrice === product.price &&
      productQuantity === product.instock &&
      productDiscount === product.discount &&
      productDescription === product.description &&
      tempImage[tempImage.length - 1] === product.image &&
      featured === tempFeatured
    ) {
      setShowSnackbar(false);
      setEditProductOpen(false);
      setTimeout(() => {
        updateSnackbar("Nothing to update", "warning");
      }, 0);
      return;
    }
    if (productName.length === 0) {
      setProductNameError("Product name is required");
      return;
    }
    if (productPrice.length === 0) {
      setProductPriceError("Product price is required");
      return;
    }
    if (isNaN(productPrice)) {
      setProductPriceError("Invalid product price");
      return;
    }
    if (productQuantity.length === 0) {
      setProductQuantityError("Product quantity is required");
      return;
    }
    if (isNaN(productQuantity)) {
      setProductQuantityError("Invalid product quantity");
      return;
    }
    if (!image) {
      setImageError("Image can't be empty");
      return;
    }
    if (productDescription.length === 0) {
      setProductDescriptionError("Product Description is required");
      return;
    }
    if (productDescription.length < 5) {
      setProductDescriptionError("Please, enter valid Description");
      return;
    }
    clearInputs();
    setUploading(true);
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("pid", product.pid);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("featured", featured);
    formData.append("discount", productDiscount);
    formData.append("instock", productQuantity);
    if (imageFile) {
      formData.append("image", imageFile);
      formData.append("oldimage", product.image);
      formData.append("imageEdited", true);
    }

    const response = await editProduct(formData);
    setUploading(false);
    setShowSnackbar(false);

    if (response.status) {
      getAllProducts();
      setEditProductOpen(false);
      setTimeout(() => {
        updateSnackbar("Product updated successfully", "success");
      }, 0);
      return;
    }
    setTimeout(() => {
      updateSnackbar(response.message, "error");
    }, 0);
  }

  useEffect(() => {
    if (isNaN(productQuantity) || productQuantity === "0") {
      setProductQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuantity]);

  useEffect(() => {
    if (isNaN(productDiscount) || productDiscount === "0") {
      setProductDiscount(0);
    }
    if (productDiscount > 100) {
      setProductDiscount(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDiscount]);

  useEffect(() => {
    if (isNaN(productPrice) || productPrice === "0") {
      setProductPrice(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productPrice]);

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        open={editProductOpen}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Edit Product
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
              label="Product Name"
              variant="outlined"
              value={productName}
              size="medium"
              className={classes.flexgroup1}
              error={productNameError ? true : false}
              helperText={productNameError}
              onClick={clearErrors}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              required
              label="Product Price"
              variant="outlined"
              value={productPrice}
              size="medium"
              className={classes.flexgroup1}
              error={productPriceError ? true : false}
              helperText={productPriceError}
              onClick={clearErrors}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Container>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Product Quantity"
              variant="outlined"
              value={productQuantity}
              size="medium"
              className={classes.flexgroup1}
              error={productQuantityError ? true : false}
              helperText={productQuantityError}
              onClick={clearErrors}
              onChange={(e) => setProductQuantity(e.target.value)}
              onBlur={(e) => updateQuantity(e.target.value)}
              fullWidth
            />
            <TextField
              required
              label="Product Discount"
              variant="outlined"
              value={productDiscount}
              size="medium"
              className={classes.flexgroup1}
              error={productNameError ? true : false}
              helperText={productNameError}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onClick={clearErrors}
              onChange={(e) => setProductDiscount(e.target.value)}
              fullWidth
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
          <Container className={classes.dialogContainer}>
            <TextField
              required
              multiline
              rows={6}
              label="Product Description"
              variant="outlined"
              value={productDescription}
              size="medium"
              className={classes.flexgroup1}
              error={productDescriptionError ? true : false}
              helperText={productDescriptionError}
              onClick={clearErrors}
              onChange={(e) => setProductDescription(e.target.value)}
              fullWidth
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
              startIcon={<CheckIcon />}
              onClick={handleEditProductSubmit}
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

export default EditProductModal;

const useStyles = makeStyles({
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
});
