import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./StylesAuthLayout";

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const version = "v0.0.7";

  return (
    <div className={classes.footerContainer}>
      <div className={classes.horizontalLine}>
        <Typography variant="caption" className={classes.footerText}>
          PMS Insight LLC © {currentYear} {version}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
