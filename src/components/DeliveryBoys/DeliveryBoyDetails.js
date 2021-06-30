import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { dangerColor, mediaUrl } from "../../helpers/Constants";
import Button from "@material-ui/core/Button";
import DeleteDeliveryBoyModal from "./DeleteDeliveryBoyModal";

const DeliveryBoyDetails = ({
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  let deliveryBoy = JSON.parse(localStorage.getItem("deliveryBoy"));
  const [deleteDeliveryBoyOpen, setDeleteDeliveryBoyOpen] = useState(false);

  return deliveryBoy ? (
    <Card className={classes.root}>
      <CardContent className={classes.contentArea}>
        <CardMedia
          className={classes.media}
          component="img"
          image={`${mediaUrl}${deliveryBoy.profile_image}`}
          title="DeliveryBoy Profile pic"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h6"
            component="h1"
            className={classes.deliveryBoyName}
          >
            {deliveryBoy.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h1"
            className={classes.deliveryBoyMobile}
          >
            Mobile: {deliveryBoy.mobile}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h1"
            className={classes.deliveryBoyRegistrationId.trim()}
          >
            Id: {deliveryBoy.uid}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="h1"
            className={classes.deliveryBoyAddress}
          >
            {deliveryBoy.address}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          style={{ backgroundColor: dangerColor, color: "#fff" }}
          variant="contained"
          fullWidth
          onClick={() => setDeleteDeliveryBoyOpen(true)}
        >
          Delete
        </Button>
        <DeleteDeliveryBoyModal
          deliveryBoyId={deliveryBoy.uid}
          deliveryBoyName={deliveryBoy.name}
          deleteDeliveryBoyOpen={deleteDeliveryBoyOpen}
          setDeleteDeliveryBoyOpen={setDeleteDeliveryBoyOpen}
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

export default DeliveryBoyDetails;

const useStyles = makeStyles({
  root: {
    maxWidth: "90vw",
    minWidth: "70vw",
    marginTop: "1rem",
    padding: "0 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentArea: {
    display: "flex",
    alignItems: "center",
  },
  media: {
    width: 200,
    maxHeight: 120,
    objectFit: "contain",
    borderRadius: "0.6rem",
  },
  cardContent: {
    width: "70%",
  },
  deliveryBoyName: {
    flex: 1,
  },
  deliveryBoyMobile: {},
  deliveryBoyRegistrationId: {
    width: "fit-content",
    background: "#FFCA28",
    fontWeight: "600",
    color: "#fff",
    padding: "0.2rem 0.6rem",
    borderRadius: "4px",
  },
  deliveryBoyAddress: {
    color: "#222a",
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
