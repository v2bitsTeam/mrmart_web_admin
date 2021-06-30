import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const NavLinks = ({ active, vertical }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      variant="fullWidth"
      value={false}
      orientation={vertical}
      onChange={handleChange}
      aria-label="Site Navigation"
    >
      <Tab
        label="Users"
        component={Link}
        to="/users"
        value={value}
        className={
          active === "users" ? `${classes.tab} ${classes.active}` : classes.tab
        }
      />
      <Tab
        label="Categories"
        component={Link}
        value={value}
        to="/categories"
        className={
          active === "categories"
            ? `${classes.tab} ${classes.active}`
            : classes.tab
        }
      />
      <Tab
        label="Orders"
        component={Link}
        value={value}
        to="/orders"
        className={
          active === "orders" ? `${classes.tab} ${classes.active}` : classes.tab
        }
      />

      <Tab
        label="Transactions"
        value={value}
        index={3}
        component={Link}
        to="/transactions"
        className={
          active === "transactions"
            ? `${classes.tab} ${classes.active}`
            : classes.tab
        }
      />
      <Tab
        label="Delivery Boys"
        value={value}
        component={Link}
        index={4}
        to="/deliveryBoys"
        className={
          active === "deliveryBoys"
            ? `${classes.tab} ${classes.active}`
            : classes.tab
        }
      />
      <Tab
        label="Pincodes"
        value={value}
        component={Link}
        index={5}
        to="/pincodes"
        className={
          active === "pincodes"
            ? `${classes.tab} ${classes.active}`
            : classes.tab
        }
      />
    </Tabs>
  );
};

export default NavLinks;

const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: "fit-content",
    color: "#dfdfdf",
    opacity: "1",
    "&:hover": {
      textDecoration: "none",
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  active: {
    opacity: 1,
    color: "#fff",
  },
}));
