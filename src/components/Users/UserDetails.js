import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { mediaUrl } from "../../helpers/Constants";
import userImage from "../../assets/images/user.jpg";

const UserDetails = () => {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("user"));

  return user ? (
    <Card className={classes.root}>
      <CardContent className={classes.contentArea}>
        <CardMedia
          className={classes.media}
          component="img"
          image={
            user.profile_image ? `${mediaUrl}${user.profile_image}` : userImage
          }
          title="User Profile pic"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h6"
            component="h1"
            className={classes.userName}
          >
            {user.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h1"
            className={classes.userEmail}
          >
            Email: {user.email}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h1"
            className={classes.userMobile}
          >
            Phone: {user.mobile}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="h1"
            className={classes.userAddress}
          >
            {`${user.location}, ${user.city},
              ${user.state}, ${user.pincode}`}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions className={classes.actions}></CardActions>
    </Card>
  ) : (
    <></>
  );
};

export default UserDetails;

const useStyles = makeStyles((theme) => ({
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
    width: "90%",
  },
  userName: {
    flex: 1,
  },
  userEmail: {
    width: "fit-content",
    background: theme.palette.primary.light,
    fontWeight: "600",
    color: "#fff",
    padding: "0.2rem 0.6rem",
    borderRadius: "4px",
  },
  userMobile: {
    width: "fit-content",
    background: "#26A69A",
    fontWeight: "600",
    color: "#fff",
    padding: "0.2rem 0.6rem",
    borderRadius: "4px",
  },
  userAddress: {
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
}));
