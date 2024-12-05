// import React, { useState } from "react";
// import { Typography, Button, Link } from "@material-ui/core";
// import CustomTextField from "../../maintain/TextField";
// import useStyles from "./StylesAuthLayout";
// import FormContainer from "../maintain/FrontLogREgForgot/FormContainer";
// import LearnMore from "./LearnForm";
// import { useAuth } from "../../Auth/AuthProvider";
// import { toast } from "react-toastify"; // Import toast from react-toastify

// const RegistrationForm = () => {
//   const classes = useStyles();
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     username: "",
//     email:"",
//     password: "",
//     // Add additional registration fields here
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRegister = async () => {
//     try {
//       // Call the register function with the form data
//       await register(formData);
//       // Show a success toast message
//       toast.success("Registration successful!");
//       // Clear the form fields
//       setFormData({
//         username: "",
//         password: "",
//         // Clear additional registration fields here
//       });
//     } catch (error) {
//       // Handle registration failure, e.g., show an error toast message
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <FormContainer>
//         <CustomTextField
//           label="Username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <CustomTextField
//           label="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <CustomTextField
//           label="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {/* Add additional registration fields here */}
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: "#90caf9",
//             marginTop: "10px",
//             height: "25px",
//           }}
//           fullWidth
//           onClick={handleRegister}
//         >
//           Register
//         </Button>
//         <Typography variant="body2" align="right">
//           <Link href="/login">Already have an account? Login</Link>
//         </Typography>
//       </FormContainer>
//       <LearnMore />
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginFormStyles from "./LoginFormStyles";
import { IconButton } from "@material-ui/core";
import { Typography, Link } from "@material-ui/core";

import { useAuth } from "../../Auth/AuthProvider";
import { Stack } from "@mui/material";
import CustomTextField from "../maintain/FrontLogREgForgot/TextField";
import CommonAuthLayout from "../maintain/FrontLogREgForgot/CommonAuthLayout";

const RegisterForm = () => {
  const history = useHistory();
  const classes = LoginFormStyles();
  const { setIsLoggedIn } = useAuth();
  const [, setErrorMessages] = useState({});

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { uname, pass } = event.target.elements;
  //   const enteredUsername = uname.value;
  //   const enteredPassword = pass.value;

  //   try {
  //     const response = await fetch(
  //       "https://apigenerator.dronahq.com/api/3idDaN3e/loginregisterjson",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: enteredUsername,
  //           password: enteredPassword,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("User is successfully registered");
  //       setIsLoggedIn(true); // Update the global state to reflect successful registration
  //       window.alert("Successfully registered! You can now login.");
  //       history.push("/login");
  //     } else {
  //       setErrorMessages({
  //         name: "uname",
  //         message: "correct a username and password",
  //       });
  //       console.error("POST request failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during the registration:", error);
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { uname, pass, email } = event.target.elements;
    const enteredUsername = uname.value;
    const enteredEmail = email.value;
    const enteredPassword = pass.value;

    try {
      // Fetch the existing data from the data URL
      const dataResponse = await fetch(
        "https://apigenerator.dronahq.com/api/3idDaN3e/loginregisterjson"
      );
      const existingData = await dataResponse.json();

      // Check if the entered username already exists
      const usernameExists = existingData.some(
        (user) => user.username === enteredUsername
      );

      if (usernameExists) {
        window.alert(
          "Username already exists. Please choose another username."
        );
        return; // Stop the registration process
      }

      // Check if the entered email already exists
      const emailExists = existingData.some(
        (user) => user.email === enteredEmail
      );

      if (emailExists) {
        window.alert("Email already exists. Please choose another email.");
        return; // Stop the registration process
      }

      // If username and email are unique, proceed with the registration
      const response = await fetch(
        "https://apigenerator.dronahq.com/api/3idDaN3e/loginregisterjson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword,
          }),
        }
      );

      if (response.ok) {
        console.log("User is successfully registered");
        setIsLoggedIn(true); // Update the global state to reflect successful registration
        window.alert("Successfully registered! You can now login.");
        history.push("/login");
      } else {
        setErrorMessages({
          name: "uname",
          message: "Failed to register. Please try again.",
        });
        console.error("POST request failed");
      }
    } catch (error) {
      console.error("An error occurred during the registration:", error);
    }
  };
  const renderLabel = (label, required) => (
    <>
      {label}
      {required && <span className={classes.redAsterisk}> *</span>}
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          label={renderLabel("Username", true)}
          name="uname"
          type="text"
        />

        <CustomTextField
          label={renderLabel("Email", true)}
          name="email"
          type="text"
        />

        <Stack direction="row" spacing={1}>
          <CustomTextField
            label={renderLabel("Password", true)}
            name="pass"
            type="password"
            required
          />
          <IconButton
            className={classes.button}
            type="submit"
            color="primary"
            variant="filled"
          >
            login
          </IconButton>
        </Stack>
      </form>
      <Typography variant="body2" color="textSecondary">
        <Link href="/" style={{ display: "flex", justifyContent: "flex-end" }}>
          Back to Login?
        </Link>
      </Typography>
    </>
  );
};

export default CommonAuthLayout(RegisterForm);
