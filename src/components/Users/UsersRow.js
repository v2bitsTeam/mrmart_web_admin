import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const UsersRow = ({ User, Index }) => {
  const classes = useStyles();
  function saveUserToLocalStorage() {
    localStorage.setItem("user", JSON.stringify(User));
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.userShopId}>{User.uid}</TableCell>
        <TableCell className={classes.userName}>{User.name}</TableCell>
        <TableCell className={classes.userEmail}>{User.email}</TableCell>
        <TableCell className={classes.userMobile}>{User.mobile}</TableCell>
        <TableCell
          className={classes.userAddress}
        >{`${User.location}, ${User.city}, ${User.state}, ${User.pincode}`}</TableCell>
        <TableCell className={classes.actions}>
          <Button
            aria-label="Go to profile page"
            size="medium"
            color="primary"
            onClick={saveUserToLocalStorage}
            to={"/user:" + User.uid}
            component={Link}
            props={User.uid}
          >
            View <DoubleArrowIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UsersRow;

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& > *": {
      borderBottom: "unset",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#efefef",
    },
  },
  userShopId: {
    width: "20%",
  },
  userName: {
    width: "15%",
  },
  userEmail: {
    width: "15%",
  },
  userMobile: {
    width: "15%",
  },
  userAddress: {
    width: "30%",
  },
  actions: {
    width: "5%",
  },
});
