import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import { useAdminUpdate } from "../../contexts/AdminContext";
import NavLinks from "./NavLinks";
import DrawBar from "./DrawBar";
import logoWhite from "../../assets/images/logo-white.png";

const NavBar = ({ active }) => {
  const classes = useStyles();
  const updateAdminLoginStatus = useAdminUpdate();
  const [anchorMenu, setAnchorMenu] = useState(null);

  function handleLogout() {
    setAnchorMenu(null);
    localStorage.setItem("admin", null);
    updateAdminLoginStatus(null);
  }
  return (
    <AppBar position="fixed">
      <Container className={classes.container}>
        <Hidden lgUp>
          <DrawBar active={active} />
        </Hidden>
        <div className={classes.logoContainer}>
          <img alt={"logo"} src={logoWhite} className={classes.logo} />
        </div>
        <Toolbar className={classes.toolbar}>
          <Hidden mdDown>
            <NavLinks active={active} />
            <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
              {/*  button change for mobile */}
              <MoreVertIcon className={classes.dropDownBtn} />
            </IconButton>
            <Menu
              anchorEl={anchorMenu}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              id="simple-menu"
              keepMounted
              open={Boolean(anchorMenu)}
              onClick={() => setAnchorMenu(!anchorMenu)}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },

  toolbar: {
    alignSelf: "flex-end",
  },
  dropDownBtn: {
    fill: "#fff",
  },
  logoContainer: {
    padding: "1rem",
    height: "6vh",
  },
  logo: {
    height: "100%",
    objectFit: "contain",
  },
});
