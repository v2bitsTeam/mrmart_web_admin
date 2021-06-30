import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QueueIcon from "@material-ui/icons/Queue";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoProductsFound from "../../assets/images/no-products.webp";
import CategoryDetails from "./CategoryDetails";
import getProducts from "./getProducts";
import ProductsTable from "./ProductsTable";
import AddProductModal from "./AddProductModal";
import { useProducts, useProductsUpdate } from "../../contexts/ProductsContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import IconButton from "@material-ui/core/IconButton";
import GoBackIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const Products = ({ categoryId }) => {
  const products = useProducts();
  const updateProducts = useProductsUpdate();
  const [loading, setLoading] = useState(true);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    getAllProducts();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllProducts() {
    const products = await getProducts(categoryId);
    updateProducts(products);
  }

  return (
    <div style={productsPage}>
      {loading ? (
        <div style={progressBar}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div style={goBack}>
            <IconButton
              aria-label="go back"
              size="small"
              component={Link}
              to={"/categories"}
            >
              <GoBackIcon color="action" />
            </IconButton>
          </div>
          <CategoryDetails
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
          {products ? (
            <>
              <ProductsTable
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
              />
            </>
          ) : (
            <div style={noProductsFoundContainer}>
              <img src={NoProductsFound} alt={"no products found"} />

              <Typography align="center" variant="h6" component="h6">
                No products found. Click "ADD" to add new products to this
                category.
              </Typography>
              <Button
                color="primary"
                variant="contained"
                size="large"
                style={addButton}
                onClick={() => setAddProductOpen(true)}
                startIcon={<QueueIcon />}
              >
                Add
              </Button>
              <AddProductModal
                addProductOpen={addProductOpen}
                setAddProductOpen={setAddProductOpen}
                setShowSnackbar={setShowSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
              />
            </div>
          )}
        </>
      )}
      {showSnackbar && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default Products;

const productsPage = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const progressBar = {
  width: "100%",
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const noProductsFoundContainer = {
  marginTop: "2rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
};
const addButton = {
  width: "150px",
  marginTop: "1rem",
};
const goBack = {
  width: "90vw",
  margin: "1rem auto 0.5rem",
  alignSelf: "flex-start",
};
