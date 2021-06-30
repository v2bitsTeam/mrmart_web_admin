import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PageviewIcon from "@material-ui/icons/Pageview";
import AcceptOrderModal from "./AcceptOrderModal";
import AssignOrderToDeliveryBoyModal from "./AssignOrderToDeliveryBoyModal";
import DeclineOrderModal from "./DeclineOrderModal";
import ViewOrderDetailsModal from "./ViewOrderDetailsModal";
import { dangerColor } from "../../helpers/Constants";

const OrderActions = ({
  Order,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [acceptOrderOpen, setAcceptOrderOpen] = useState(false);
  const [assignOrderOpen, setAssignOrderOpen] = useState(false);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  const [declineOrderOpen, setDeclineOrderOpen] = useState(false);

  if (Order.status === "Pending Confirmation") {
    return (
      <div className={classes.pendingOrders}>
        <div>
          <Tooltip
            arrow
            title="Accept Order"
            aria-label="accept order"
            placement="bottom-end"
          >
            <IconButton
              aria-label="accept order button"
              size="small"
              color="primary"
              onClick={() => setAcceptOrderOpen(true)}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <AcceptOrderModal
            order={Order}
            acceptOrderOpen={acceptOrderOpen}
            setAcceptOrderOpen={setAcceptOrderOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
        <div className={classes.declineOrderButtonContainer}>
          <Tooltip
            arrow
            title="Decline Order"
            aria-label="decline order"
            placement="bottom-start"
          >
            <IconButton
              aria-label="decline order button"
              size="small"
              style={{ color: dangerColor }}
              onClick={() => setDeclineOrderOpen(true)}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
          <DeclineOrderModal
            order={Order}
            declineOrderOpen={declineOrderOpen}
            setDeclineOrderOpen={setDeclineOrderOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
      </div>
    );
  } else if (Order.status === "Order Accepted") {
    return (
      <div className={classes.pendingOrders}>
        <div className={classes.assignOrderButtonContainer}>
          <Tooltip
            arrow
            title="Assign Order"
            aria-label="assign order"
            placement="bottom-end"
          >
            <IconButton
              aria-label="assign order button"
              size="small"
              color="primary"
              onClick={() => setAssignOrderOpen(true)}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          <AssignOrderToDeliveryBoyModal
            order={Order}
            assignOrderOpen={assignOrderOpen}
            setAssignOrderOpen={setAssignOrderOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
      </div>
    );
  } else if (Order.status === "Order Declined") {
    return (
      <div className={classes.singleActionButtonContainer}>
        <Tooltip arrow title="Re-Assign Order" aria-label="re-assign order">
          <IconButton
            aria-label="re-assign order button"
            size="small"
            style={{ color: dangerColor }}
            onClick={() => setAssignOrderOpen(true)}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
        <AssignOrderToDeliveryBoyModal
          order={Order}
          assignOrderOpen={assignOrderOpen}
          setAssignOrderOpen={setAssignOrderOpen}
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      </div>
    );
  } else if (Order.status === "Awaiting Payment") {
    return <div className={classes.singleActionButtonContainer}></div>;
  }
  return (
    <div className={classes.singleActionButtonContainer}>
      <div className={classes.assignOrderButtonContainer}>
        <Tooltip arrow title="View Order" aria-label="view order">
          <IconButton
            aria-label="view order button"
            size="small"
            style={{ color: "#FF9800" }}
            onClick={() => setViewOrderOpen(true)}
          >
            <PageviewIcon />
          </IconButton>
        </Tooltip>
        <ViewOrderDetailsModal
          order={Order}
          viewOrderOpen={viewOrderOpen}
          setViewOrderOpen={setViewOrderOpen}
        />
      </div>
    </div>
  );
};

export default OrderActions;

const useStyles = makeStyles({
  pendingOrders: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  singleActionButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
