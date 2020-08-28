import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box } from "@material-ui/core";
import Pie from "./Pie";

const MapPopup = ({ popupData }) => {
  const classes = useStyles();

  return (
    <div>
      {popupData && (
        <div>
          <Box className={classes.mainContainer}>
            <Box className={classes.leftContainer}>
              <p className={classes.country}>{popupData.country}</p>
              <Divider />
              <Box className={classes.dataContainer}>
                <Box className={classes.data}>
                  <p>Confirmed: <span className={classes.confirmed}>{popupData.confirmed.toLocaleString("fr-Fr")}</span></p>
                  <p>Deaths: <span className={classes.deaths}>{popupData.deaths.toLocaleString("fr-Fr")}</span></p>
                  <p>Recovered: <span className={classes.recovered}>{popupData.recovered.toLocaleString("fr-Fr")}</span></p>
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" light={true} />
                <Box>
                  <Pie data={popupData} />
                </Box>
              </Box>
            </Box>
            <Box className={classes.signatureContainer}>
              <p style={{ fontSize: "2vh" }}>Réalisé par :</p>
              <img className={classes.signature} src="https://fontmeme.com/permalink/200526/ae3d981f7dcca22b45e492e5d2651652.png" alt="polices-de-signature" border="0" />
              <img className={classes.signature} src="https://fontmeme.com/permalink/200526/798efc5010d60b7e8c546de546f4b89b.png" alt="polices-de-signature" border="0" />
            </Box>
          </Box>
        </div>
      )}
      {!popupData && (
        <Box className={classes.signaturefull}>
          <p style={{ fontSize: "2vh" }}>Réalisé par :</p>
          <img className={classes.signature} src="https://fontmeme.com/permalink/200526/ae3d981f7dcca22b45e492e5d2651652.png" alt="polices-de-signature" border="0" />
          <img className={classes.signature} src="https://fontmeme.com/permalink/200526/798efc5010d60b7e8c546de546f4b89b.png" alt="polices-de-signature" border="0" />
        </Box>
      )}
    </div>
  )
};

const useStyles = makeStyles(theme => ({
  country: {
    margin: 0,
    marginBottom: 2,
    textAlign: "center",
    fontSize: "2vh"
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "space-between"
  },
  mainContainer: {
    display: "flex",
    justifyItems: "space-between"
  },
  dataContainer: {
    display: "flex",
  },
  data: {
    marginLeft: 5,
    marginRight: 10
  },
  deaths: {
    fontWeight: "bold"
  },
  devider: {
    margin: 5
  },
  confirmed: {
    fontWeight: "bold",
    color: theme.palette.primary.main
  },
  signatureContainer: {
    textAlign: "center",
    width: '50%'
  },
  signaturefull: {
    textAlign: "center",
    width: '100%'
  },
  recovered: {
    fontWeight: "bold",
    color: "#77b200"
  },
  signature: {
    width: 120,
    margin: 15
  }
}));

export default MapPopup;