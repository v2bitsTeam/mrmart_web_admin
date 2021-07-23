import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { dangerColor, mediaUrl } from "../../helpers/Constants";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoryDetails = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  let category = JSON.parse(localStorage.getItem("category"));
  return category ? (
    <Card className={classes.root}>
      <CardContent className={classes.contentArea}>
        <CardMedia
          className={classes.media}
          component="img"
          image={`${mediaUrl}${category.category_image}`}
          title="Category Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.categoryName}
          >
            {category.category_name}
          </Typography>
          {category.featured === true || category.feature === "true" ? (
            <StarIcon className={classes.starIcon} />
          ) : (
            <></>
          )}
        </CardContent>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          style={{ marginLeft: "0.6em" }}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => setEditCategoryOpen(true)}
        >
          Edit
        </Button>
        <EditCategoryModal
          category={category}
          editCategoryOpen={editCategoryOpen}
          setEditCategoryOpen={setEditCategoryOpen}
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
        <Button
          size="small"
          style={{ backgroundColor: dangerColor, color: "#fff" }}
          variant="contained"
          fullWidth
          onClick={() => setDeleteCategoryOpen(true)}
        >
          Delete
        </Button>
        <DeleteCategoryModal
          categoryId={category.cid}
          categoryName={category.category_name}
          deleteCategoryOpen={deleteCategoryOpen}
          setDeleteCategoryOpen={setDeleteCategoryOpen}
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      </CardActions>
    </Card>
  ) : (
    <></>
  );
};

export default CategoryDetails;

const useStyles = makeStyles({
  root: {
    minWidth: "70%",
    maxWidth: "80%",
    marginTop: "1rem",
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  starIcon: {
    color: "#f44336",
  },
  contentArea: {
    display: "flex",
  },
  media: {
    width: 200,
    maxHeight: 150,
    objectFit: "contain",
    borderRadius: "0.3rem",
    boxShadow: " 0px 2px 10px 1px #59595933",
  },
  categoryName: {
    flex: 1,
  },
  actions: {
    width: "20%",
    height: 80,
    maxWidth: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
