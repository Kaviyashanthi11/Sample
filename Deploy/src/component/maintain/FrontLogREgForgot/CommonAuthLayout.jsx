import React from "react";
import { Card, CardContent } from "@material-ui/core";
import LoginFormStyles from "../../Session/LoginFormStyles";
import LogoImage from "../../../images/logo-large.png";

const CommonAuthLayout = WrappedComponent => {
  const WithCommonAuthLayout = props => {
    const classes = LoginFormStyles();

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.logoContainer}>
              <img src={LogoImage} alt="Logo" className={classes.logo} />
            </div>
            <div className={classes.form}>
              <WrappedComponent classes={classes} {...props} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return WithCommonAuthLayout;
};

export default CommonAuthLayout;
