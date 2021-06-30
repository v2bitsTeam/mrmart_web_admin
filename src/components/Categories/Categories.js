import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoProductsFound from "../../assets/images/no-products.webp";
import CategoriesTable from "./CategoriesTable";
import getCategories from "./getCategories";
import AddCategoryModal from "./AddCategoryModal";
import {
  useCategories,
  useCategoriesUpdate,
} from "../../contexts/CategoriesContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const Categories = ({ fromLocation }) => {
  const categories = useCategories();
  const updateCategories = useCategoriesUpdate();
  const [loading, setLoading] = useState(true);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addCategorySuccess, setAddCategorySuccess] = useState(false);

  useEffect(() => {
    getAllCategories();
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllCategories() {
    const categories = await getCategories();
    updateCategories(categories);
  }
  return (
    <div style={categoriesPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : categories ? (
        <CategoriesTable setAddCategorySuccess={setAddCategorySuccess} />
      ) : (
        <div style={noCategoriesFoundContainer}>
          <img src={NoProductsFound} alt={"no categories found"} />
          <Typography variant="h6" component="h6">
            No categories found
          </Typography>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={addButton}
            onClick={() => setAddCategoryOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddCategoryModal
            addCategoryOpen={addCategoryOpen}
            setAddCategoryOpen={setAddCategoryOpen}
            setAddCategorySuccess={setAddCategorySuccess}
          />
        </div>
      )}
      {fromLocation === "delete" && (
        <CustomSnackbar
          message="Category deleted successfully"
          severity="success"
        />
      )}
      {fromLocation === "edit" && (
        <CustomSnackbar
          message="Category edited successfully"
          severity="success"
        />
      )}
      {addCategorySuccess && (
        <CustomSnackbar
          message="Category added successfully"
          severity="success"
        />
      )}
    </div>
  );
};

export default Categories;

const categoriesPage = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const loadingContainer = {
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const noCategoriesFoundContainer = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const addButton = {
  width: "150px",
  marginTop: "1rem",
};
