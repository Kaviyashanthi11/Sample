import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import CustomTextField from "../../../maintain/CustomTextField";

const SecurityQuestion = ({ onSubmit, onClose }) => {
  const [options, setOptions] = useState([]);
  const [securityQuestions, setSecurityQuestions] = useState([
    { question: "", id: "", answer: "" },
    { question: "", id: "", answer: "" },
    { question: "", id: "", answer: "" }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    fetch(
      "https://rcm1-eclaimstatus.com/React/web/index.php?r=api/question-master-view"
    )
      .then(response => response.json())
      .then(data => {
        const options = data.map(question => ({
          value: question.sQuestion,
          label: question.sQuestion,
          id: question.iQuestionId
        }));
        setOptions(options);
      });
  }, []);

  const handleAnswerChange = event => {
    const { value } = event.target;
    setSecurityQuestions(prevQuestions =>
      prevQuestions.map(
        (question, index) =>
          index === currentQuestionIndex
            ? { ...question, answer: value }
            : question
      )
    );
  };

  const handleNext = event => {
    event.preventDefault();
    const currentQuestion = securityQuestions[currentQuestionIndex];
    if (!currentQuestion.answer) {
      alertAndFocus("Please enter an answer.", "securityQuestionAnswer");
      return;
    }
    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setDialogOpen(false);
      onSubmit({
        securityQuestion1: securityQuestions[0].id,
        securityQuestion1Answer: securityQuestions[0].answer,
        securityQuestion2: securityQuestions[1].id,
        securityQuestion2Answer: securityQuestions[1].answer,
        securityQuestion3: securityQuestions[2].id,
        securityQuestion3Answer: securityQuestions[2].answer
      });
    }
  };

  const alertAndFocus = (message, fieldName) => {
    alert(message);
    const inputField = document.querySelector(`[name="${fieldName}"]`);
    if (inputField) {
      inputField.focus();
      inputField.style.borderColor = "#007bff";
      inputField.style.boxShadow = "0 0 5px #007bff";
      inputField.addEventListener("blur", () => {
        inputField.style.borderColor = "";
        inputField.style.boxShadow = "";
      });
    }
  };

  useEffect(() => {
    fetchSecurityQuestion().then(data => {
      setQuestion(data.question);
    });
  }, []);

  const fetchSecurityQuestion = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ question: "What is your mother's maiden name?" });
      }, 1000);
    });
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          maxHeight: "80vh",
          maxWidth: "80vh"
        }
      }}
      style={{ top: "-270px" }}
    >
      <DialogContent>
        <div className="container">
          <div className="row">
            <div className="col">
              <form>
                <DialogTitle>
                  {question}
                </DialogTitle>

                <CustomTextField
                  name="securityQuestionAnswer"
                  star={true}
                  value={securityQuestions[currentQuestionIndex].answer}
                  onChange={handleAnswerChange}
                />

                <Typography
                  variant="body2"
                  style={{
                    position: "absolute",
                    flexGrow: 1,
                    textAlign: "right",
                    fontSize: "0.8rem",
                    color: "#2196f3"
                  }}
                >
                  <Link
                    to="/checkquestion"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer"
                    }}
                    onMouseEnter={e =>
                      (e.target.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.target.style.textDecoration = "none")}
                  >
                    Forgot Answer?
                  </Link>
                </Typography>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Button onClick={handleNext} color="primary" size="small">
                      {currentQuestionIndex < 2 ? "Next >>" : "Submit"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={onClose}
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "#424242", color: "white" }}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityQuestion;
