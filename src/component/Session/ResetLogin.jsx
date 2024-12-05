import React, { useState } from "react";
import CustomTextField from "../../maintain/TextField";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Backdrop,
  
} from "@mui/material";
import LogoImage from "../../ecs/images/logo.webp";
import { useHistory, useLocation } from "react-router-dom";
import logoImage1 from "../../ecs/images/favicon (1).webp";

const ResetLogin = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const userId = location.state?.userId ;
  const username = location.state?.userName ;
  const history = useHistory();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const [isLoading, setIsLoading] = useState(false);
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
         history.push({
          pathname: "/",
          state: {
            userName: username,
            passwordEnabled: true
          }
        });
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

export default ResetLogin;
