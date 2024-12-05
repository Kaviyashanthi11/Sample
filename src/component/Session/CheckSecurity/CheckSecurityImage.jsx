import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  makeStyles,
  Typography,
  Link,
  Snackbar
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import DogsImages from "../../../LoginImages/Dogs.jpeg";
import BirdNewImages from "../../../LoginImages/BirdNew.jpg";
import GuitarImages from "../../../LoginImages/Guitar.jpeg";
import ShipImages from "../../../LoginImages/Ship.jpeg";
import GlobeImages from "../../../LoginImages/Globe.jpg";
import HelicopterImages from "../../../LoginImages/Helicopter.jpeg";
import CustomTextField from "../../../maintain/CustomTextField";

const localImages = {
  Dogs: DogsImages,
  BirdNew: BirdNewImages,
  Globe: GlobeImages,
  Guitar: GuitarImages,
  Helicopter: HelicopterImages,
  Ship: ShipImages
};

const useStyles = makeStyles(theme => ({
  imageGridContainer: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px"
  },
  imageGridCell: {
    border: "10px solid #00b0ff",
    padding: "20px"
  },
  imageWrapper: {
    position: "relative",
    width: "100px",
    height: "100px",
    margin: "5px"
  },
  selectedImageWrapper: {
    border: "5px solid lightblue"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "3px"
  },
  radioButton: {
    position: "absolute",
    top: "50%",
    left: "-19px",
    transform: "translateY(-50%)"
  },
  errorMessage: {
    color: "red",
    textAlign: "center"
  },
  nextButton: {
    color: "#29b6f6",
    fontWeight: "bold"
  },
})); 

const CheckImageQuestionSecure = ({ onClose, iUserId,setUsernameChecked }) => {
  const [dialogOpen,] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reselectedImage, setReselectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const location = useLocation();
  const classes = useStyles();
  const { userName } = location.state || {};
  const [isForgotImage, setIsForgotImage] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/React/web/index.php?r=api/login-images-view");
        const data = await response.json();
        const imagesData = data.map(img => ({
          name: img.sLoginImageName.split(".")[0],
          src: require(`../../../LoginImages/${img.sLoginImageName}`),
          iLoginImagesId: img.iLoginImagesId
        }));
        shuffleArray(imagesData);
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
        shuffleArray(Object.values(localImages));
        setImages(
          Object.values(localImages).map((src, index) => ({
            name: Object.keys(localImages)[index],
            src,
            iLoginImagesId: index + 1
          }))
        );
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch("/React/web/index.php?r=api/question-master-view");
        const questionsData = await response.json();
        setSecurityQuestions(questionsData);
        setSelectedQuestion(questionsData[0]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchImages();
    fetchQuestions();
  }, []);  


  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleImageClick = imageId => {
    if (step === 1 || step === 3) {
      setSelectedImage(imageId);
    } else if (step === 4) {
      setReselectedImage(imageId);
    }
    setErrorMessage("");
  };

  const handleNext = async () => {
    if (step === 1) {
      console.log("Step 1: Image selection step.");
      if (selectedImage !== null) {
        console.log("Selected Image ID:", selectedImage);
        try {
          const response = await fetch("/React/web/index.php?r=api/security-image-check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iUserId,
              sUserName: userName,
              iImageSelected: selectedImage,
              isForgotImage: false,
            }),
          });
          const data = await response.json();
          console.log("Response received:", data);
          if (data.status) {
            alert(data.message);
            console.log("Image selection successful, moving to step 2");
            const question = securityQuestions.find(q => q.iQuestionId === data.securityQuestion);
            setSelectedQuestion(question);
            setIsForgotImage(data.isForgotImage);
            setStep(2);
          } else {
            console.log("Image selection failed:", data.message);
            alert(data.message); 
            onClose(); 
          }
        } catch (error) {
          console.error("Error submitting image selection:", error);
          alert("An error occurred while submitting your selection. Please try again.");
          onClose();
        }
      } else {
        console.log("No image selected.");
        alert("Please select an image before proceeding.");
      }
    } else if (step === 2) {
      console.log("Step 2: Security question step.");
      if (securityAnswer.trim() && selectedQuestion) {
        console.log("Security answer provided:", securityAnswer);
        console.log("Selected Question ID:", selectedQuestion.iQuestionId);
        try {
          const response = await fetch("/React/web/index.php?r=api/security-question-check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iUserId,
              securityQuestion: selectedQuestion.iQuestionId,
              securityAnswer,
              isForgotImage,
            }),
          });
          const data = await response.json();
          console.log("Response received:", data);
          if (data.status) {
            if (isForgotImage) {
              // If isForgotImage is true, proceed to step 3
              setStep(3);
              alert("Security answer verified successfully. Please select an image.");
            } else {
              // If isForgotImage is false, close the dialog and proceed
              onClose();
              setUsernameChecked(true); // Enable the password field
              alert("Security answer verified successfully. Please enter your password.");
            }
          } else {
            console.log("Security answer submission failed:", data.message);
            alert(data.message);
            onClose();
          }
        } catch (error) {
          console.error("Error submitting security answer:", error);
          alert("An error occurred while submitting your answer. Please try again.");
          onClose();
        }
      } else {
        console.log("No security answer or question provided.");
        setErrorMessage("Please provide an answer to the security question.");
      }
    } else if (step === 3) {
      console.log("Step 3: Image selection step.");
      if (selectedImage !== null) {
        console.log("Selected Image ID:", selectedImage);
        setStep(4);
      
      } else {
        console.log("No image selected.");
        setErrorMessage("Please select an image before proceeding.");
      }
    } else if (step === 4) {
      console.log("Step 4: Image re-selection step.");
      if (reselectedImage !== null) {
        console.log("Re-selected Image ID:", reselectedImage);
        if (selectedImage === reselectedImage) {
          try {
            const response = await fetch("/React/web/index.php?r=api/set-security-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                iUserId,
                sUserName: userName,
                iImageSelected: reselectedImage,
                isForgotImage: false,
              }),
            });
            const data = await response.json();
            console.log("Response received:", data);
            if (data.status) {
              alert("Selected Image submitted successfully");
              onClose();
            } else {
              console.log("Image re-selection failed:", data.message);
              setErrorMessage(data.message);
            }
          } catch (error) {
            console.error("Error submitting image re-selection:", error);
            alert("An error occurred while submitting your selection. Please try again.");
            onClose();
          }
        } else {
          console.log("Selected images do not match.");
          setErrorMessage("The selected images do not match. Please select the same image.");
        }
      } else {
        console.log("No image selected.");
        setErrorMessage("Please select an image before proceeding.");
      }
    }
  };
  
  const handleForgotImageAnswer = async () => {
    if (step === 2) {
      onClose();
      alert("Please Contact administrator");
    } else {
      console.log("Forgot Image clicked, moving to step 2.");
      try {
        const response = await fetch("/React/web/index.php?r=api/forgot-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ iUserId, isForgotImage: true }),
        });
  
        const data = await response.json();
        console.log("Response received:", data);
  
        if (data.securityQuestion) {
          const question = securityQuestions.find(
            (q) => q.iQuestionId === data.securityQuestion
          );
          setSelectedQuestion(question);
          setIsForgotImage(true);
          setStep(2);
        } else {
          console.log("No security question returned.");
          alert("An error occurred. Please try again.");
          onClose();
        }
      } catch (error) {
        console.error("Error fetching security question:", error);
        alert(
          "An error occurred while fetching the security question. Please try again."
        );
        onClose();
      }
    }
  };
  
  
  const handleSecurityAnswerChange = (e) => {
   if (errorMessage) {
      setErrorMessage("");
    }
    setSecurityAnswer(e.target.value);
  };

  const ImageGrid = ({ images, handleImageClick, selectedImage }) => {
    const classes = useStyles();
    return (
      <div className={classes.imageGridContainer}>
        <table className={classes.imageGrid}>
          <tbody>
            {[...Array(Math.ceil(images.length / 3))].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(3)].map((_, colIndex) => {
                  const imageIndex = rowIndex * 3 + colIndex;
                  if (imageIndex < images.length) {
                    const image = images[imageIndex];
                    return (
                      <td
                        key={image.iLoginImagesId}
                        className={classes.imageGridCell}
                      >
                        <div
                          className={`${classes.imageWrapper} ${
                            selectedImage === image.iLoginImagesId
                              ? classes.selectedImageWrapper
                              : ""
                          }`}
                          onClick={() => handleImageClick(image.iLoginImagesId)}
                        >
                          <input
                            className={classes.radioButton}
                            type="radio"
                            name="imageSelection"
                            value={image.iLoginImagesId}
                            checked={selectedImage === image.iLoginImagesId}
                            onChange={() =>
                              handleImageClick(image.iLoginImagesId)
                            }
                          />
                          <img
                            className={classes.image}
                            src={image.src}
                            alt={image.sLoginImageName}
                          />
                        </div>
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      style={{ top: "-270px" }} 
    >
      <DialogContent>
        {step === 1 && (
          <>
            <Typography variant="body1" align="center">
              Select your secure access image.
            </Typography>
            <ImageGrid images={images} handleImageClick={handleImageClick} selectedImage={selectedImage} />
          </>
        )}
        {step === 2 && (     
          <>
            <Typography variant="body1" align="center"> 
              {selectedQuestion ? selectedQuestion.sQuestion : "Loading question..."}
            </Typography>
            <CustomTextField
              variant="outlined"
              value={securityAnswer}
              onChange={handleSecurityAnswerChange}
              fullWidth
            />
          </>
        )}
        {step === 3 && (
          <>
            <Typography variant="body1" align="center">
              Select your secure access image.
            </Typography>
            <ImageGrid images={images} handleImageClick={handleImageClick} selectedImage={selectedImage} />
          </>
        )}
        {step === 4 && (
          <>
            <Typography variant="body1" align="center">
              Re-select your secure access image.
            </Typography>
            <ImageGrid images={images} handleImageClick={handleImageClick} selectedImage={reselectedImage} />
          </>
        )}
        {errorMessage && (
          <Typography className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
       {(step === 1 || step === 2) && (
          <Typography
            variant="body2"
            style={{
              position: "absolute",
              bottom: 80,
              right: 30,
              fontSize: "0.8rem",
              color: "#2196f3"
            }}
          >
            <Link
              to="#"
              onClick={handleForgotImageAnswer}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer"
              }}
              onMouseEnter={e => (e.target.style.textDecoration = "underline")}
              onMouseLeave={e => (e.target.style.textDecoration = "none")}
            >
              {step === 1 ? "Forgot Image" : "Forgot Answer"}
            </Link>
          </Typography>
        )}
      
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              onClick={handleNext}
              color="primary"
              size="small"
              className={classes.nextButton}
            >
              {step === 1 ? "Next >>" : step === 2 ? "Next >>" : step === 3 ? "Next >>" : "Next >>"}
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
      </DialogActions>
    </Dialog>
  );
};

export default CheckImageQuestionSecure;
