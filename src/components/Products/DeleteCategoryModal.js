import React, { useState } from "react";
import { Redirect } from "react-router";
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
import deleteCategory from "./deleteCategory";

const DeleteCategoryModal = ({
  categoryId,
  categoryName,
  deleteCategoryOpen,
  setDeleteCategoryOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [categoryDeleted, setCategoryDeleted] = useState(false);

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function handleDeleteCategory() {
    setShowSnackbar(false);
    setLoading(true);
    const response = await deleteCategory(categoryId);
    setLoading(false);
    if (response.status) {
      setCategoryDeleted(true);
    }
    setTimeout(() => {
      updateSnackbar("Something went wrong. Please, try again later.", "error");
    }, 0);
    setDeleteCategoryOpen(false);
    return;
  }
  if (categoryDeleted)
    return (
      <Redirect
        to={{
          pathname: "/categories",
          state: { fromLocation: "delete" },
        }}
      />
    );
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={deleteCategoryOpen}
      onClose={() => setDeleteCategoryOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography color="error" variant="h6" component="span">
            Are you sure?
          </Typography>
          <Button
            color="secondary"
            onClick={() => setDeleteCategoryOpen(false)}
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
            label="Category Name"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={categoryName}
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
          <CircularProgress />
          <br />
        </div>
        <Container className={classes.dialogContainer}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#b2102f", color: "#fff" }}
            size="large"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteCategory}
            className={classes.flexgroup1}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setDeleteCategoryOpen(false);
            }}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;

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
