import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "../../ecs/images/steto1.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient( #90caf9, #26c6da)",
  },
  loginForm: {
    width: "55%",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
      marginRight: "5px",
      width: "100%",
      padding: theme.spacing(2),
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "100%",
      marginLeft: "150px",
      marginRight: "150px",
    },
  },
  backgroundImage: {
    width: "80%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      backgroundImage: `none`,
    },
  },
  card: {
    maxWidth: "370px",
    maxHeight: "400px",
    marginLeft: "90px",
    marginRight: "190px",
    marginTop: "80px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "35px",
      marginRight: "5px",
      width: "100%",
      padding: theme.spacing(2),
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      marginLeft: "20px",
      marginRight: "20px",
    },
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  logo: {
    width: "135px",
    height: "130px",
    margin: "10px",
  },
  learnMoreText: {
    marginBottom: theme.spacing(2),
    alignItems: "center",
  },
  learnMoreButton: {
    marginTop: theme.spacing(1),
    marginLeft: "40%",
  },
  learnMoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
  },
  learnMoreCard: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20%",
    marginLeft: "20%",
    justifyContent: "space-between",
    width: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  footerContainer: {
    position: "relative",
    marginTop: "200px",
  },
  horizontalLine: {
    borderBottom: "1px solid #ccc",
    color: "#212121",
    left: "5%",
  },
  footerText: {
    position: "absolute",
    left: "45%",
    transform: "translateX(-50%)",
    color: "#212121",
    fontWeight: "bold",
    marginTop: "10px",
  },
}));

export default useStyles;
