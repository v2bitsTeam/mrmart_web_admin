import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxSelectedIcon from "@material-ui/icons/CheckBox";
import SearchIcon from "@material-ui/icons/Search";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import getDeliveryBoys from "../DeliveryBoys/getDeliveryBoys";
import ConfirmAssignOrderModal from "./ConfirmAssignOrderModal";
import {
  useDeliveryBoys,
  useDeliveryBoysUpdate,
} from "../../contexts/DeliveryBoysContext";
import { mediaUrl } from "../../helpers/Constants";

const AssignOrderToDeliveryBoyModal = ({
  order,
  assignOrderOpen,
  setAssignOrderOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const deliveryBoys = useDeliveryBoys();
  let temporarySearchResults = "";
  const updateDeliveryBoys = useDeliveryBoysUpdate();
  const [confirmAssignOrderOpen, setConfirmAssignOrderOpen] = useState();
  const [selectedDeliveryBoyId, setSelectedDeliveryBoyId] = useState();
  const [selectedDeliveryBoyName, setSelectedDeliveryBoyName] = useState();
  const [filteredValues, setFilteredValues] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setSelectedDeliveryBoyId(null);
      setSelectedDeliveryBoyName(null);
      setConfirmAssignOrderOpen(false);
      getAllDeliveryBoys();
    }
    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) setFilteredValues(deliveryBoys);
    return function cleanup() {
      mounted = false;
    };
  }, [deliveryBoys]);

  async function getAllDeliveryBoys() {
    const deliveryBoys = await getDeliveryBoys();
    updateDeliveryBoys(deliveryBoys);
  }

  let searchFilter = (e) => {
    let search = e.target.value;
    temporarySearchResults = deliveryBoys?.filter(
      (deliveryBoy) =>
        deliveryBoy.name.toLowerCase().includes(search.toLowerCase()) ||
        deliveryBoy.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredValues(temporarySearchResults);
  };

  function handleSelectDeliveryBoy(deliveryBoy) {
    setSelectedDeliveryBoyId(deliveryBoy.uid);
    setSelectedDeliveryBoyName(deliveryBoy.name);
  }

  function handleCancel() {
    setSelectedDeliveryBoyId(null);
    setSelectedDeliveryBoyName(null);
    setAssignOrderOpen(false);
  }

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={assignOrderOpen}
      onClose={() => setAssignOrderOpen(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" component="span">
            Choose the delivery boy
          </Typography>
          <Button color="secondary" onClick={() => setAssignOrderOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container>
          <Typography align="left" variant="h6" component="h6">
            Delivery boy list:
          </Typography>
          <div className={classes.deliveryBoysList}>
            {filteredValues ? (
              <List>
                <TextField
                  helperText="Search delivery boy based on his address"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {<SearchIcon />}
                      </InputAdornment>
                    ),
                  }}
                  onChange={searchFilter}
                />
                {filteredValues.map((filteredValue) => (
                  <ListItem key={filteredValue.uid}>
                    <ListItemAvatar>
                      <Avatar
                        alt={filteredValue.name}
                        src={mediaUrl + filteredValue.profile_image}
                        className={classes.avatarBg}
                      >
                        {filteredValue.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={filteredValue.name}
                      secondary={filteredValue.location}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="checkbox"
                        onClick={() => handleSelectDeliveryBoy(filteredValue)}
                      >
                        {selectedDeliveryBoyId === filteredValue.uid ? (
                          <CheckBoxSelectedIcon
                            className={classes.checkBoxSelected}
                          />
                        ) : (
                          <CheckBoxBlankIcon />
                        )}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="error" component="h6">
                Sorry, No delivery Boys Found
              </Typography>
            )}
          </div>
        </Container>
        <br />
        <Container className={classes.dialogContainer}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedDeliveryBoyId ? true : false}
            size="large"
            className={classes.flexgroup1}
            onClick={() => setConfirmAssignOrderOpen(true)}
          >
            Assign
          </Button>
          <ConfirmAssignOrderModal
            order={order}
            selectedDeliveryBoyId={selectedDeliveryBoyId}
            selectedDeliveryBoyName={selectedDeliveryBoyName}
            setAssignOrderOpen={setAssignOrderOpen}
            confirmAssignOrderOpen={confirmAssignOrderOpen}
            setConfirmAssignOrderOpen={setConfirmAssignOrderOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleCancel}
            className={classes.flexgroup1}
          >
            Cancel
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default AssignOrderToDeliveryBoyModal;

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2em",
    marginBottom: "0.5em",
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
  avatarBg: { background: "#FF9800" },
  checkBoxSelected: {
    color: "#1565C0",
  },
});
