import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  makeStyles,
  Typography,
  Link
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DogsImages from "../../../LoginImages/Dogs.jpeg";
import BirdNewImages from "../../../LoginImages/BirdNew.jpg";
import GuitarImages from "../../../LoginImages/Guitar.jpeg";
import ShipImages from "../../../LoginImages/Ship.jpeg";
import GlobeImages from "../../../LoginImages/Globe.jpg";
import HelicopterImages from "../../../LoginImages/Helicopter.jpeg";
import CustomTextField from "../../../maintain/TextField";

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

const CheckImageQuestionSecure = ({ onNext, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [securityAnswer, setSecurityAnswer] = useState("");

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "/React/web/index.php?r=api/login-images-view"
        );
        const imagesData = response.data.map(img => ({
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

    fetchImages();
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleImageClick = imageId => {
    setSelectedImage(imageId);
    setErrorMessage("");
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedImage !== null) {
        setStep(2);
      } else {
        setErrorMessage("Please select an image before proceeding.");
      }
    } else {
      if (securityAnswer.trim()) {
        console.log("User security answer:", securityAnswer);
        if (typeof onNext === "function") {
          onNext({ selectedImage, securityAnswer });
          setDialogOpen(false);
        } else {
          console.error("onNext is not a function:", onNext);
        }
      } else {
        setErrorMessage("Please provide an answer to the security question.");
      }
    }
  };

  const handleForgotAnswer = () => {
    if (step === 1) {
      history.push("/checkquestion"); // Route for step 1
    } else {
      history.push("/checkquestion"); // Route for step 2 (security answer)
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      style={{ top: "-100px",width: "80%", height: "80%" }} 
    >
      <DialogContent>
        {step === 1 ? (
          <>
            <Typography variant="body1" align="center">
              Select your secure access image.
            </Typography>
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
                                onClick={() =>
                                  handleImageClick(image.iLoginImagesId)
                                }
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
                                  alt={image.name}
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
          </>
        ) : (     
            <>
            <Typography variant="body1" align="center">
              Answer the security question.
            </Typography>
            <CustomTextField
              variant="outlined"
              value={securityAnswer}
              onChange={e => setSecurityAnswer(e.target.value)}
              fullWidth
            />
            </>
             )}
        {errorMessage && (
          <Typography className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        )}
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
            onClick={handleForgotAnswer}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer"
            }}
            onMouseEnter={e => (e.target.style.textDecoration = "underline")}
            onMouseLeave={e => (e.target.style.textDecoration = "none")}
          >
            Forgot Answer?
          </Link>
        </Typography>
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
              {step === 1 ? "Next >>" : "Submit"}
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
