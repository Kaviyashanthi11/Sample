import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  Typography,
  Button,
  Box
} from "@mui/material";
import LogoImage from "../../ecs/images/logo.webp";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Backdrop } from "@material-ui/core";
import logoImage from "../../ecs/images/favicon (1).webp";
import CustomTextFieldPassword from "../../maintain/TextFieldforgotPassword";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [iUserId, setIUserId] = useState(null); // Add state for iUserId
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!username) {
      alert("Please enter the user ID");
      return;
    }
    setIsLoading(true);
    setErrorMessage(""); // Clear previous error message
    try {
      const securityQuestionResponse = await fetch(
        "/React/web/index.php?r=api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sUserName: username })
        }
      );
      const securityQuestionData = await securityQuestionResponse.json();

      if (!securityQuestionResponse.ok || !securityQuestionData.status) {
        setErrorMessage(securityQuestionData.message || "Invalid user ID");
        setIsLoading(false);
        return;
      }

      const { securityQuestion, iUserId } = securityQuestionData; // Extract iUserId
      setIUserId(iUserId); // Save iUserId in the state

      const questionsResponse = await fetch(
        "/React/web/index.php?r=api/question-master-view"
      );
      const questionsData = await questionsResponse.json();
      setSecurityQuestions(questionsData);
      const question = questionsData.find(
        q => q.iQuestionId === securityQuestion
      );
      if (question) {
        setSelectedQuestion(question);
        setStep(2);
      } else {
        console.warn(
          "Security question not found in questions data:",
          securityQuestion
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch security question");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleSecurityAnswerChange = e => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setSecurityAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!securityAnswer) {
      alert("Please enter the security answer");
      return;
    }
    setIsLoading(true);

    try {
      const submitResponse = await fetch(
        "/React/web/index.php?r=api/forgot-password-step1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            iUserId, // Use iUserId from the state
            sUserName: username,
            securityQuestion: selectedQuestion.iQuestionId,
            securityAnswer
          })
        }
      );
      const responseData = await submitResponse.json();

      console.log("Submit Response:", submitResponse);
      console.log("Response Data:", responseData);

      if (!submitResponse.ok || !responseData.status) {
        setErrorMessage(responseData.message || "Invalid security answer");
      } else {
        alert("Your password has been sent to your registered email.");
        history.push("/");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMessage("Failed to submit security answer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
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
              Forgot Password
            </Typography>
          </Toolbar>
        </AppBar>
      </AppBar>

      <Grid container style={{ marginTop: "100px", padding: "20px" }}>
        {step === 1 &&
          <Grid item xs={12} sm={6} lg={6} md={12}>
            <CustomTextFieldPassword
              label="Enter Your User ID"
              value={username}
              onChange={handleUsernameChange} // Update this line
              star="true"
              smallLabel={true}
            />
            {errorMessage &&
              <Typography
                variant="body2"
                align="center"
                style={{ color: "red" }}
              >
                {errorMessage}
              </Typography>}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px"
              }}
            >
              <Button
                onClick={handleContinue}
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#81d4fa",
                  marginRight: "10px",
                  color: "#212121"
                }}
              >
                Continue
              </Button>
              <Button
                onClick={handleCancel}
                variant="contained"
                style={{ backgroundColor: "#212121" }}
                size="small"
              >
                Cancel
              </Button>
            </div>
          </Grid>}

        {step === 2 &&
          <Grid item xs={12} sm={6} lg={6} md={12}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginBottom="10px"
            >
              <Typography
                variant="body1"
                label="Security Question"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  marginRight: "100px" // Add margin-right for spacing
                }}
              >
                Security Question
              </Typography>
              <Typography variant="body1" style={{ textAlign: "center" }}>
                {selectedQuestion
                  ? selectedQuestion.sQuestion
                  : "Loading question..."}
              </Typography>
            </Box>

            <CustomTextFieldPassword
              label="Security Answer"
              variant="outlined"
              value={securityAnswer}
              onChange={handleSecurityAnswerChange}
              star="true"
              smallLabel={true}
            />
            {errorMessage &&
              <Typography
                variant="body2"
                align="center"
                style={{ color: "red" }}
              >
                {errorMessage}
              </Typography>}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px"
              }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="small"
                style={{ backgroundColor: "#81d4fa", color: "#212121" }}
              >
                Submit
              </Button>
            </div>
          </Grid>}
      </Grid>
      <Backdrop open={isLoading} style={{ zIndex: 1 }}>
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "30px", height: "auto" }}
        />
      </Backdrop>
    </div>
  );
};

export default ForgotPassword;
