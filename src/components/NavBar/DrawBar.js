import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavLinks from "./NavLinks";
import { useAdminUpdate } from "../../contexts/AdminContext";
import Tab from "@material-ui/core/Tab";

const DrawBar = ({ active }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const UpdateAdminLogin = useAdminUpdate();

  function handleLogout() {
    localStorage.setItem("admin", null);
    UpdateAdminLogin(null);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <ThemeProvider theme={mobileTheme}>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onEscapeKeyDown={() => {
            setOpen(false);
          }}
          onBackdropClick={() => {
            setOpen(false);
          }}
        >
          <NavLinks active={active} vertical="vertical" />
          <Tab
            className={classes.logOut}
            label="Log Out"
            onClick={handleLogout}
          />
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default DrawBar;

const useStyles = makeStyles({
  dropDownBtn: {
    fill: "#fff",
  },
  logOut: {
    minWidth: "100%",
    color: "#fff",
    backgroundColor: "#f50057",
    opacity: "1",
    "&:hover": {
      textDecoration: "none",
    },
  },
});

const mobileTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paper: {
        backgroundColor: "#444",
        paddingTop: 60,
        width: "200px",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.15)",
      },
    },
  },
});
