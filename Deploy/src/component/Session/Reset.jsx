import React, { useState } from "react";
import CustomTextField from "../../maintain/TextField";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  IconButton,
  Backdrop
} from "@mui/material";
import LogoImage from "../../ecs/images/logo.webp";
import { useAuth } from "../../Auth/AuthProvider";
import Logout from "./Logout";
import { Link, useLocation ,useHistory} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logoImage1 from "../../ecs/images/favicon (1).webp";

const Reset = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const userId = location.state?.userId || user?.id;
  const username = location.state?.userName || user?.name;
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleSubmit = async () => {
    if (!oldPassword) {
      setErrorMessage("Old Password is required.");
      return;
    }
  
    if (!newPassword) {
      setErrorMessage("New Password is required.");
      return;
    }
  
    if (!confirmPassword) {
      setErrorMessage("Re-Type New Password is required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New Password and Re-Type New Password do not match.");
      return;
    }
  
    if (oldPassword === newPassword) {
      setErrorMessage("Old Password and New Password cannot be the same.");
      return;
    }
  
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage("Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)");
      return;
    }
    
    const userData = {
      iUserId: userId,
      sUserName: username,
      sOldPassword: oldPassword,
      sNewPassword: newPassword,
      sConfirmPassword: confirmPassword,
    };
    setIsLoading(true);
    try {
      const response = await fetch("/React/web/index.php?r=api/password-expiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (data.status) {
        alert(data.message);
        logoutUser();
         history.push("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while processing your request.");
      console.error("Error submitting data:", error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          height: "28px",
          background: "black",
          color: "white",
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            marginTop: "-18px",
            justifyContent: "space-between"
          }}
        >
          <div style={{ flexGrow: 2 }} />
          {user && user.name && (
            <Typography variant="body2">
              {user.name.toUpperCase()}
            </Typography>
          )}

          <Typography variant="body2" style={{ margin: "0 10px" }}>
            |
          </Typography>
          <Typography variant="body2">
            <Link
              to="/reset"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer"
              }}
              onMouseEnter={e => (e.target.style.textDecoration = "underline")}
              onMouseLeave={e => (e.target.style.textDecoration = "none")}
            >
              Reset
            </Link>
          </Typography>
          <Typography variant="body2" style={{ margin: "0 10px" }}>
            |
          </Typography>
          <Typography variant="body2">
            {user && <Logout onLogout={logoutUser} />}
          </Typography>
        </Toolbar>

        {/* Second AppBar */}
        <AppBar
          position="static"
          elevation={2}
          sx={{ marginTop: "-18px", backgroundColor: "white", height: "50px" }}
        >
          <Toolbar>
            <img src={LogoImage} alt="logo" style={{ marginTop: "-11px" }} />
          </Toolbar>
        </AppBar>
        <AppBar
          position="static"
          elevation={2}
          sx={{
            height: "25px",
            color: "black",
            backgroundColor: "lightgrey",
            zIndex: theme => theme.zIndex.drawer + 2
          }}
        >
          <Toolbar
            sx={{
              top: "-19px"
            }}
          >
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>

            <Typography
              style={{
                margin: "0 10px",
                whiteSpace: "nowrap",
                marginTop: "3px"
              }}
            >
              Reset Password
            </Typography>
          </Toolbar>
        </AppBar>
      </AppBar>

      <Grid container style={{ marginTop: "100px", padding: "20px" }}>
        <Grid item xs={8} sm={8} md={8}>
          <CustomTextField
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={e => {
              setOldPassword(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            fullWidth
            star="true"
          />
          <CustomTextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            fullWidth
            star="true"
          />

          <CustomTextField
            type="password"
            label="Re-Type New Password"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            fullWidth
            star="true"
          />
        </Grid>
      </Grid>

      {errorMessage && (
        <Typography variant="body2" align="center" style={{ color: "red" }}>
          {errorMessage}
        </Typography>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button variant="contained" style={{ backgroundColor: "#4fc3f7" }} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Backdrop open={isLoading} style={{ zIndex: 1 }}>
        <img
          src={logoImage1}
          alt="Logo"
          style={{ width: "30px", height: "auto" }}
        />
      </Backdrop>

    </div>
  );
};

export default Reset;
