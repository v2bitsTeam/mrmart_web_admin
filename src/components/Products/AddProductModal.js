import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import addProduct from "./addProduct";
import getProducts from "./getProducts";
import { useProductsUpdate } from "../../contexts/ProductsContext";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const AddProduct = ({
  addProductOpen,
  setAddProductOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const updateProducts = useProductsUpdate();
  const categoryId = JSON.parse(localStorage.getItem("category")).cid;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [productNameError, setProductNameError] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [productPriceError, setProductPriceError] = useState("");
  const [productDiscountError, setProductDiscountError] = useState("");
  const [productQuantityError, setProductQuantityError] = useState("");
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const classes = useStyles();

  const clearInputs = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setProductDiscount("0");
    setImage(null);
  };

  const clearErrors = () => {
    setProductNameError(null);
    setProductDescriptionError(null);
    setProductPriceError(null);
    setProductQuantityError(null);
    setProductDiscountError(null);
    setImageError(null);
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

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

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

  async function handleAddProductSubmit() {
    if (productName.trim().length === 0) {
      setProductNameError("Product name is required");
      return;
    }
    if (productPrice.trim().length === 0) {
      setProductPriceError("Product price is required");
      return;
    }
    if (isNaN(productPrice.trim())) {
      setProductPriceError("Invalid product price");
      return;
    }
    if (productQuantity.trim().length === 0) {
      setProductQuantityError("Product quantity is required");
      return;
    }
    if (isNaN(productQuantity.trim())) {
      setProductQuantityError("Invalid product quantity");
      return;
    }
    if (productDiscount.trim().length === 0) {
      setProductDiscountError("Product quantity is required");
      return;
    }
    if (isNaN(productDiscount.trim())) {
      setProductDiscountError("Invalid product discount");
      return;
    }
    if (!image) {
      setImageError("Image can't be empty");
      return;
    }
    if (productDescription.trim().length === 0) {
      setProductDescriptionError("Product Description is required");
      return;
    }
    if (productDescription.trim().length < 5) {
      setProductDescriptionError("Please, enter valid Description");
      return;
    }
    clearInputs();
    setUploading(true);

    const formData = new FormData();
    formData.append("name", productName.trim());
    formData.append("cid", categoryId);
    formData.append("price", productPrice.trim());
    formData.append("description", productDescription.trim());
    formData.append("featured", featured);
    formData.append("discount", productDiscount.trim());
    formData.append("image", image);
    formData.append("instock", productQuantity.trim());

    const response = await addProduct(formData);
    setUploading(false);
    setShowSnackbar(false);
    if (response.status) {
      getAllProducts();
      setAddProductOpen(false);
      setTimeout(() => {
        updateSnackbar("Product added successfully", "success");
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
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add New Product
            </Typography>
            <Button color="secondary" onClick={() => setAddProductOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
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
              error={productDiscountError ? true : false}
              helperText={productDiscountError}
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
              startIcon={<AddIcon />}
              onClick={handleAddProductSubmit}
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

export default AddProduct;

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
