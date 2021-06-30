import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import DeletePincodeModal from "./DeletePincodeModal";
import { dangerColor } from "../../helpers/Constants";

const PincodesRow = ({
  pincode,
  index,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [deletePincodeOpen, setDeletePincodeOpen] = useState(false);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={classes.pincodeId}>{index}</TableCell>
        <TableCell className={classes.pincodeValue}>
          {pincode.pincode}
        </TableCell>
        <TableCell className={classes.pincodeAddress}>
          {pincode.address}
        </TableCell>
        <TableCell className={classes.pincodeStatus}>
          {pincode.status}
        </TableCell>
        <TableCell className={classes.pincodeActions}>
          <IconButton
            aria-label="Delete pincode"
            size="medium"
            style={{ color: dangerColor }}
            onClick={() => setDeletePincodeOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
          <DeletePincodeModal
            pincodeId={pincode.id}
            pincode={pincode.pincode}
            address={pincode.address}
            deletePincodeOpen={deletePincodeOpen}
            setDeletePincodeOpen={setDeletePincodeOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default PincodesRow;

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
  pincodeId: {
    width: "20%",
  },
  pincodeValue: {
    width: "30%",
  },
  pincodeAddress: {
    width: "30%",
  },
  pincodeStatus: {
    width: "20%",
  },
  pincodeActions: {
    width: "10%",
  },
});
