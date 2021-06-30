import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import TextField from "@material-ui/core/TextField";
import bg from "../../assets/images/login-bg.jpg";
import { useAdminUpdate } from "../../contexts/AdminContext";
import AdminLogin from "./AdminLogin";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import logoOrange from "../../assets/images/logo-orange.png";

const Authentication = () => {
  const classes = useStyles();
  const updateAdminLoginStatus = useAdminUpdate();
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(false);

  function checkEnterKey(e) {
    if (e.keyCode === 13 || e.which === 13) {
      handleSubmit();
    }
  }
  async function handleSubmit() {
    if (mobile.length === 0) {
      setMobileError("Mobile Number in required");
    } else if (mobile.length !== 10 || isNaN(mobile)) {
      setMobileError("Invalid Mobile Number");
    } else if (password.length === 0) {
      setPasswordError("Password in required");
    } else {
      const admin = await AdminLogin(mobile, password);
      if (admin.role) {
        updateAdminLoginStatus(admin);
        localStorage.setItem("admin", JSON.stringify(admin));
        return;
      }
      setLoginError(admin);
    }
  }
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      updateAdminLoginStatus(admin);
      return;
    }
  }, [updateAdminLoginStatus]);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.bg}
        style={{ background: `url(${bg}) center/cover` }}
      ></div>
      <div className={classes.bgOverlay}></div>
      <Container maxWidth="xs" className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <img alt={"logo"} src={logoOrange} className={classes.logo} />

            <TextField
              required
              label="Mobile"
              className={classes.mobileField}
              variant="outlined"
              value={mobile}
              error={mobileError.length > 0}
              helperText={mobileError}
              onChange={(e) => setMobile(e.target.value)}
              onClick={() => setMobileError("")}
            />

            <TextField
              required
              label="Password"
              className={classes.passwordField}
              variant="outlined"
              type={!passwordHidden ? "password" : "text"}
              value={password}
              error={passwordError.length > 0}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setPasswordError("")}
              onKeyPress={(e) => checkEnterKey(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                    style={{ cursor: "pointer" }}
                  >
                    {!passwordHidden ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {loginError && (
              <CustomSnackbar message={loginError} severity={"error"} />
            )}
          </CardContent>
          <CardActions className={classes.signInBtnContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.signInBtn}
              size="large"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default Authentication;

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    width: "100vw",
    height: "100vh",
  },
  bg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    filter: "blur(0.2rem)",
    top: 0,
    zIndex: -1,
  },
  bgOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 0,
    backgroundColor: "#33333355",
  },
  container: {
    position: "relative",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "10vh",
    objectFit: "contain",
    margin: "2rem 0",
  },
  card: {
    width: "100%",
    height: "360px",
    padding: "1rem 0",
    borderRadius: "0.5rem",
  },
  cardContent: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 2rem",
  },
  cardTitle: {
    fontSize: "2rem",
    textAlign: "center",
    height: "20%",
  },
  mobileField: {
    width: "100%",
    margin: "1rem 0",
  },
  passwordField: {
    width: "100%",
    margin: "1rem 0",
  },
  signInBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
