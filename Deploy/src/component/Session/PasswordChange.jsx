// import React, { useState } from "react";
// import CustomTextField from "../../maintain/TextField";
// import { AppBar, Button, Toolbar, Grid, Typography } from "@mui/material";
// import LogoImage from "../../ecs/images/logo.webp";
// import { useLocation, useHistory } from "react-router-dom";

// const ChangePassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const location = useLocation();
//   const history = useHistory();
//   const { userId, userName } = location.state || {};

//   const handleSave = async () => {
//     // Password validation criteria
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

//     if (!passwordRegex.test(newPassword)) {
//       setErrorMessage(
//         "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
//       );
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "/React/web/index.php?r=api/login-set-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             iUserId: userId,
//             sUserName: userName,
//             sNewPassword: newPassword
//           })
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         if (data.status) {
//           // Password changed successfully
//           console.log("Password changed successfully");
//           setErrorMessage("");
//           setNewPassword("");
//           setConfirmPassword("");
//           history.push({
//             pathname: "/",
//             state: {
//               userName: userName,
//               passwordEnabled: true
//             }
//           });
//         } else {
//           setErrorMessage(data.message || "Failed to change password");
//         }
//       } else {
//         const data = await response.json();
//         setErrorMessage(data.message || "Failed to change password");
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       setErrorMessage("Failed to change password");
//     }
//   };

//   return (
//     <div>
//       <AppBar
//         position="fixed"
//         elevation={2}
//         sx={{
//           height: "28px",
//           background: "black",
//           color: "white",
//           zIndex: theme => theme.zIndex.drawer + 1
//         }}
//       >
//         <Toolbar
//           sx={{
//             height: "100%",
//             display: "flex",
//             marginTop: "-18px",
//             justifyContent: "space-between"
//           }}
//         >
//           <div style={{ flexGrow: 2 }} />
//         </Toolbar>

//         {/* Second AppBar */}
//         <AppBar
//           position="static"
//           elevation={2}
//           sx={{ marginTop: "-18px", backgroundColor: "white", height: "50px" }}
//         >
//           <Toolbar>
//             <img src={LogoImage} alt="logo" style={{ marginTop: "-11px" }} />
//           </Toolbar>
//         </AppBar>
//       </AppBar>

//       <Grid container style={{ marginTop: "100px", padding: "20px" }}>
//         <Grid item xs={8} sm={8} md={8}>
//           <CustomTextField
//             type="password"
//             label="New Password"
//             value={newPassword}
//             onChange={e => setNewPassword(e.target.value)}
//             fullWidth
//             star={true}
//           />

//           <CustomTextField
//             type="password"
//             label="Re-Type New Password"
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             fullWidth
//             star={true}
//           />
//         </Grid>
//       </Grid>

//       {errorMessage &&
//         <Typography variant="body2" align="center" style={{ color: "red" }}>
//           {errorMessage}
//         </Typography>}

//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <Button
//           onClick={handleSave}
//           variant="contained"
//           style={{ backgroundColor: "#4fc3f7" }}
//         >
//           Save
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState } from "react";
import CustomTextField from "../../maintain/TextField";
import { AppBar, Button, Toolbar, Grid, Typography } from "@mui/material";
import LogoImage from "../../ecs/images/logo.webp";
import { useLocation, useHistory } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const history = useHistory();
  const { userId, userName } = location.state || {};

  const handleSave = async () => {
    // Password validation criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "/React/web/index.php?r=api/login-set-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            iUserId: userId,
            sUserName: userName,
            sNewPassword: newPassword
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          // Password changed successfully
          alert("Password changed successfully");
          setErrorMessage("");
          setNewPassword("");
          setConfirmPassword("");
          history.push({
            pathname: "/",
            state: {
              userName: userName,
              passwordEnabled: true
            }
          });
        } else {
          setErrorMessage(data.message || "Failed to change password");
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("Failed to change password");
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

      {errorMessage &&
        <Typography variant="body2" align="center" style={{ color: "red" }}>
          {errorMessage}
        </Typography>}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          onClick={handleSave}
          variant="contained"
          style={{ backgroundColor: "#4fc3f7" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
