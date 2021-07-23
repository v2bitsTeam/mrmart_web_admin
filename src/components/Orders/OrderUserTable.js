import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { mediaUrl } from "../../helpers/Constants";
import getOrderUserdetails from "./getOrderUserdetails";

const OrderUserTable = ({ userId }) => {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    let mounted = true;

    async function getUserDetails() {
      const response = await getOrderUserdetails(userId);
      if (response && mounted) {
        setUserDetails(response.data[0]);
      }
    }

    getUserDetails();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box margin={1} className={classes.descriptionContainer}>
      <Typography
        className={classes.productDescription}
        variant="h6"
        component="h4"
        gutterBottom
      >
        User Details
      </Typography>
      <Table size="small" aria-label="products" className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails && (
            <TableRow key={userDetails.pid} className={classes.tableRow}>
              <TableCell component="th" scope="row" className={classes.userId}>
                {userDetails.uid}
              </TableCell>

              <TableCell className={classes.userName}>
                {userDetails.name}
              </TableCell>
              <TableCell className={classes.userEmail}>
                {userDetails.email}
              </TableCell>
              <TableCell className={classes.userMobile}>
                {userDetails.mobile}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderUserTable;

const useStyles = makeStyles({
  productDescription: { textAlign: "center" },
  root: {
    width: "100%",
    "& > *": {
      borderBottom: "unset",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
    },
  },
  tableRow: { height: "5rem" },
  userId: {
    width: "25%",
  },
  userName: {
    width: "25%",
  },
  userEmail: {
    width: "25%",
  },
  userMobile: {
    width: "25%",
  },
});
