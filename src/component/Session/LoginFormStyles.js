import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "../../../src/images/bg-pattern.webp";

const LoginFormStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: `url(${BackgroundImage})`, // Replace with your background image path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  card: {
    position: "relative",
    maxWidth: "390px",
    width: "80%", // Adjust width as needed
    maxHeight: "430px",
    marginLeft: "5%", // card move from a left side
    padding: "25px",
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3), 
    flexDirection: "column",

  },
  logo: {
    width: 150,
    height: 150,
  },
}));

export default LoginFormStyles;
