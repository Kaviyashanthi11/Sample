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
import {  useLocation } from "react-router-dom";
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

const CheckSecurityQuestionLogin = ({ onClose, iUserId }) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reselectedImage, setReselectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1); 
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);


  const classes = useStyles();

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

  const handleImageClick = imageId => {
    if (step === 2) {
      console.log("Selected Image ID:", imageId);
      setSelectedImage(imageId);
    } else if (step === 3) {
      console.log("Reselected Image ID:", imageId);
      setReselectedImage(imageId);
    }
    setErrorMessage("");
  };
  
  const handleNext = async () => {
    if (step === 1) {
      if (securityAnswer.trim() && selectedQuestion) {
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
              isForgotImage : false ,
            }),
          });
          const data = await response.json();
          if (data.status) {
            alert("Security question answer authentication verified successfully");
            setStep(2);
          } else {
            alert(data.message);
            onClose();
          }
        } catch (error) {
          setErrorMessage("An error occurred while submitting your answer. Please try again.");
        }
      } else {
        setErrorMessage("Please provide an answer to the security question.");
      }
    } else if (step === 2) {
      if (selectedImage !== null) {
        setStep(3);
        console.log("Proceeding to reselect image. Initial selected image ID:", selectedImage);
        shuffleArray(images);
      } else {
        setErrorMessage("Please select an image before proceeding.");
      }
    } else if (step === 3) {
      if (reselectedImage !== null) {
        if (reselectedImage === selectedImage) {
          try {
            const response = await fetch("/React/web/index.php?r=api/set-security-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                iUserId,
                iImageSelected: reselectedImage,
              }),
            });
            const data = await response.json();
            if (data.status) {
              alert("Your Image has set successfully, Please login again using your credentials");
              onClose();
            } else {
              setErrorMessage(data.message);
            }
          } catch (error) {
            setErrorMessage("An error occurred while submitting your selection. Please try again.");
          }
        } else {
          setErrorMessage("The images do not match. Please select the same image again.");
        }
      } else {
        setErrorMessage("Please reselect an image before proceeding.");
      }
    }
  };  
  
  const handleForgotImageAnswer = () => {
    // Close the dialog
    onClose();
    // Show alert with the message
    alert("Please Contact administrator");
  };
  

  const handleSecurityAnswerChange = e => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setSecurityAnswer(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch security question for the user first
        const securityQuestionResponse = await fetch(
          "/React/web/index.php?r=api/get-security-question",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ iUserId })
          }
        );
        const { securityQuestion } = await securityQuestionResponse.json();
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
        } else {
          console.warn(
            "Security question not found in questions data:",
            securityQuestion
          );
        }
  
        // Set local images immediately for a quick user response
        shuffleArray(Object.values(localImages));
        setImages(
          Object.values(localImages).map((src, index) => ({
            name: Object.keys(localImages)[index],
            src,
            iLoginImagesId: index + 1
          }))
        );
  
        // Fetch images from the server
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
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };
  
    fetchData();
  }, [iUserId]);
  
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleBack = () => {
    setStep(2);
    setReselectedImage(null);
    setSelectedImage(null);
  };
  

  return (
    <>
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
              <Typography variant="h6" align="center">Security Question</Typography>
              <Typography variant="subtitle1">
                {selectedQuestion ? selectedQuestion.sQuestion : "Loading..."}
              </Typography>
              <CustomTextField
                type="text"
                value={securityAnswer}
                onChange={handleSecurityAnswerChange}
                placeholder="Enter your answer"
              />
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
                onMouseEnter={e =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={e => (e.target.style.textDecoration = "none")}
              >
                Forgot Answer
              </Link>
            </Typography>
            </>
          )}
          {step === 2 && (
            <>
              <Typography variant="body1" align="center">
              Select your secure access image.
            </Typography>
              <ImageGrid images={images} handleImageClick={handleImageClick} selectedImage={selectedImage} />
            </>
          )}
          {step === 3 && (
            <>
              <Typography variant="body1" align="center">
              Re-select your secure access image.
            </Typography>
              <ImageGrid images={images} handleImageClick={handleImageClick} selectedImage={reselectedImage} />
            </>
          )}
          {errorMessage && (
            <Typography variant="body2" className={classes.errorMessage}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
          {step === 3 && (
              <Button
                onClick={handleBack}
                size="small"
                style={{color: "#29b6f6",fontWeight: "bold" }}
              >
                 &lt;&lt; Back             
                  </Button>
            )}

            <Button
              onClick={handleNext}
              color="primary"
              size="small"
              className={classes.nextButton}
            >
              {step === 1 ? "Next >>" : "Next >>"}
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
     </>
  );
};

export default CheckSecurityQuestionLogin;
