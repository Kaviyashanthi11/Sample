import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DogsImages from "../../LoginImages/Dogs.jpeg";
import BirdNewImages from "../../LoginImages/BirdNew.jpg";
import GuitarImages from "../../LoginImages/Guitar.jpeg";
import ShipImages from "../../LoginImages/Ship.jpeg";
import GlobeImages from "../../LoginImages/Globe.jpg";
import HelicopterImages from "../../LoginImages/Helicopter.jpeg";

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
  }
}));

const ImageGrid = ({ images, handleImageClick, selectedImage }) => {
  const classes = useStyles();
  return (
    <div className={classes.imageGridContainer}>
      <table className={classes.imageGrid}>
        <tbody>
          {[...Array(Math.ceil(images.length / 3))].map((_, rowIndex) =>
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
                        className={`${classes.imageWrapper} ${selectedImage ===
                        image.iLoginImagesId
                          ? classes.selectedImageWrapper
                          : ""}`}
                        onClick={() => handleImageClick(image.iLoginImagesId)}
                      >
                        <input
                          className={classes.radioButton}
                          type="radio"
                          name="imageSelection"
                          value={image.iLoginImagesId}
                          checked={selectedImage === image.iLoginImagesId}
                          onChange={() =>
                            handleImageClick(image.iLoginImagesId)}
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
          )}
        </tbody>
      </table>
    </div>
  );
};

const ImageDialog = ({
  open,
  onClose,
  onNext,
  title,
  onBack,
  images,
  selectedImage,
  handleImageClick,
  buttonText = "Next >>",
  errorMessage
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      style={{ top: "-170px" }}
      // disableBackdropClick
      // disableEscapeKeyDown
    >
      <DialogContent>
        <Typography variant="body1" align="center">
          {title}
        </Typography>
        <ImageGrid
          images={images}
          handleImageClick={handleImageClick}
          selectedImage={selectedImage}
        />
        {errorMessage &&
          <Typography className={classes.errorMessage}>
            {errorMessage}
          </Typography>}
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            {onBack &&
              <Button
                size="small"
                className={classes.nextButton}
                onClick={onBack}
              >
                &lt;&lt; Back
              </Button>}

            <Button
              onClick={onNext}
              color="primary"
              size="small"
              className={classes.nextButton}
            >
              {buttonText}
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

const ImageSecure = ({ onNext, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [reselectDialogOpen, setReselectDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reselectedImage, setReselectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "/React/web/index.php?r=api/login-images-view"
        );
        const imagesData = response.data.map(img => ({
          name: img.sLoginImageName.split(".")[0],
          src: require(`../../LoginImages/${img.sLoginImageName}`),
          iLoginImagesId: img.iLoginImagesId // Include iLoginImagesId in the image object
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
    if (dialogOpen) {
      setSelectedImage(imageId);
    } else if (reselectDialogOpen) {
      setReselectedImage(imageId);
    }
    setErrorMessage("");
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      console.log("User selected the secure access image ID:", selectedImage);
      setDialogOpen(false);
      shuffleArray(images);
      setReselectDialogOpen(true);
    } else {
      setErrorMessage("Please select an image before proceeding.");
    }
  };

  const handleReselectNext = () => {
    if (typeof onNext === "function") {
      if (reselectedImage === selectedImage) {
        console.log(
          "User re-selected the correct secure access image ID:",
          reselectedImage
        );
        onNext(selectedImage); // Pass selectedImage to onNext
        setReselectDialogOpen(false);
      } else {
        setErrorMessage(
          "Please re-select the correct image before proceeding."
        );
      }
    } else {
      console.error("onNext is not a function:", onNext);
    }
  };

  const handleBack = () => {
    setReselectDialogOpen(false);
    setDialogOpen(true);
    setSelectedImage(null);
    setReselectedImage(null);
    setErrorMessage("");
  };
  // const handleClose = () => {
  //   setDialogOpen(false);
  //   setReselectDialogOpen(false);
  //   setSelectedImage(null);
  //   setReselectedImage(null);
  //   setErrorMessage("");
  // };

  return (
    <div>
      <ImageDialog
        open={dialogOpen}
        onClose={onClose} 
        onNext={handleNext}
        title="Select your secure access image."
        images={images}
        selectedImage={selectedImage}
        handleImageClick={handleImageClick}
        errorMessage={errorMessage}
      />
      <ImageDialog
        open={reselectDialogOpen}
        onClose={onClose}
        onNext={handleReselectNext}
        onBack={handleBack}
        title="Re-select your secure access image."
        images={images}
        selectedImage={reselectedImage}
        handleImageClick={handleImageClick}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ImageSecure;
