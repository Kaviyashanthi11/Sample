import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography
} from "@material-ui/core";
import CustomSelect from "../../maintain/Select";
import CustomTextField from "../../maintain/TextField";

const SecurityQuestion = ({ onSubmit, onClose }) => {
  const [options, setOptions] = useState([]);
  const [securityQuestion1, setsecurityQuestion1] = useState({
    question: "",
    id: ""
  });
  const [securityQuestion2, setsecurityQuestion2] = useState({
    question: "",
    id: ""
  });
  const [securityQuestion3, setsecurityQuestion3] = useState({
    question: "",
    id: ""
  });
  const [securityQuestion1Answer, setsecurityQuestion1Answer] = useState("");
  const [securityQuestion2Answer, setsecurityQuestion2Answer] = useState("");
  const [securityQuestion3Answer, setsecurityQuestion3Answer] = useState("");
  const [dialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    fetch("/React/web/index.php?r=api/question-master-view")
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

  const handleChangeqs1 = event => {
    const selectedOption = options.find(
      option => option.value === event.target.value
    );
    setsecurityQuestion1({
      question: selectedOption.value,
      id: selectedOption.id
    });
  };

  const handleChangeqs2 = event => {
    const selectedOption = options.find(
      option => option.value === event.target.value
    );
    setsecurityQuestion2({
      question: selectedOption.value,
      id: selectedOption.id
    });
  };

  const handleChangeqs3 = event => {
    const selectedOption = options.find(
      option => option.value === event.target.value
    );
    setsecurityQuestion3({
      question: selectedOption.value,
      id: selectedOption.id
    });
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

  const handleNext = event => {
    event.preventDefault();
    if (
      !securityQuestion1.question ||
      !securityQuestion2.question ||
      !securityQuestion3.question ||
      !securityQuestion1Answer ||
      !securityQuestion2Answer ||
      !securityQuestion3Answer
    ) {
      if (!securityQuestion1.question) {
        alertAndFocus(
          "Please select a security question for Question 1.",
          "securityQuestion1"
        );
      } else if (!securityQuestion1Answer) {
        alertAndFocus(
          "Please enter an answer for Question 1.",
          "securityQuestion1Answer"
        );
      } else if (!securityQuestion2.question) {
        alertAndFocus(
          "Please select a security question for Question 2.",
          "securityQuestion2"
        );
      } else if (!securityQuestion2Answer) {
        alertAndFocus(
          "Please enter an answer for Question 2.",
          "securityQuestion2Answer"
        );
      } else if (!securityQuestion3.question) {
        alertAndFocus(
          "Please select a security question for Question 3.",
          "securityQuestion3"
        );
      } else if (!securityQuestion3Answer) {
        alertAndFocus(
          "Please enter an answer for Question 3.",
          "securityQuestion3Answer"
        );
      }
      return;
    }

    setDialogOpen(false);
    onSubmit({
      securityQuestion1: securityQuestion1.id,
      securityQuestion1Answer,
      securityQuestion2: securityQuestion2.id,
      securityQuestion2Answer,
      securityQuestion3: securityQuestion3.id,
      securityQuestion3Answer
    });
  };

  const filteredOptions1 = options.filter(
    option =>
      option.value !== securityQuestion2.question &&
      option.value !== securityQuestion3.question
  );

  const filteredOptions2 = options.filter(
    option =>
      option.value !== securityQuestion1.question &&
      option.value !== securityQuestion3.question
  );

  const filteredOptions3 = options.filter(
    option =>
      option.value !== securityQuestion1.question &&
      option.value !== securityQuestion2.question
  );

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
      style={{ top: "-170px" }}
    >
      <DialogContent>
        <div className="container">
          <div className="row">
            <div className="col">
              <form>
                <Typography variant="body1" style={{ textAlign: "center" }}>
                  Please fill in Security Questions
                </Typography>

                <div>
                  <CustomSelect
                    label="Security Question 1"
                    name="securityQuestion1"
                    value={securityQuestion1.question}
                    onChange={handleChangeqs1}
                    options={filteredOptions1}
                    placeholder="Select an option"
                  />

                  <CustomTextField
                    label="Answer 1"
                    name="securityQuestion1Answer"
                    star={true}
                    value={securityQuestion1Answer}
                    onChange={e => setsecurityQuestion1Answer(e.target.value)}
                    smallLabel={true}
                  />

                  <CustomSelect
                    label="Security Question 2"
                    value={securityQuestion2.question}
                    name="securityQuestion2"
                    onChange={handleChangeqs2}
                    options={filteredOptions2}
                    placeholder="Select an option"
                  />

                  <CustomTextField
                    label="Answer 2"
                    name="securityQuestion2Answer"
                    star={true}
                    value={securityQuestion2Answer}
                    onChange={e => setsecurityQuestion2Answer(e.target.value)}
                  />

                  <CustomSelect
                    label="Security Question 3"
                    value={securityQuestion3.question}
                    name="securityQuestion3"
                    onChange={handleChangeqs3}
                    options={filteredOptions3}
                    placeholder="Select an option"
                  />

                  <CustomTextField
                    label="Answer 3"
                    name="securityQuestion3Answer"
                    star={true}
                    value={securityQuestion3Answer}
                    onChange={e => setsecurityQuestion3Answer(e.target.value)}
                  />

                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        onClick={handleNext}
                        color="primary"
                        size="small"
                        style={{ color: "#29b6f6", fontWeight: "bold" }}
                      >
                        Next &gt;&gt;
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withRouter(SecurityQuestion);
