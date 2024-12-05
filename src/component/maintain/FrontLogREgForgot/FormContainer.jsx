import React from "react";
import { Card, CardContent } from "@material-ui/core";
import LogoImage from "../../../ecs/images/logo-large.png";
import useStyles from "../../Session/StylesAuthLayout";
import Footer from "../../Session/FooterFrontpage";

const FormContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.loginForm}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.logoContainer}>
            <img src={LogoImage} alt="Logo" className={classes.logo} />
          </div>
          {children}
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default FormContainer;
