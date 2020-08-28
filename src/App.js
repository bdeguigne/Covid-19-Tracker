import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Total from "./components/Total";
import Box from "@material-ui/core/Box";
import Graph from './components/Graph';
import TableCountry from "./components/TableCountry"
import WorldMap from "./components/WorldMap"
import Update from "./components/Update"
import theme from "./theme";
import CountryJson from "./countryData.json"
import { CircularProgress } from '@material-ui/core';
import ReactTooltip from "react-tooltip";
import MapPopup from "./components/MapPopup";

function App() {
  const classes = useStyles();
  const [total, setTotal] = useState(-1);
  const [deaths, setDeaths] = useState(-1);
  const [recovered, setRecovered] = useState(-1);
  const [selectedCountry, setSelectedCountry] = useState({
    country: "",
    code: ""
  });
  const [updateDate, setUpdateDate] = useState(0);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [country, setCountry] = useState({
    mainCountry: "",
    mainSlug: "",
    province: ""
  });
  const [initialTotal, setInitialTotal] = useState(null);
  const [confirmedDataTable, setConfirmedDataTable] = useState([]);
  const [deathsDataTable, setDeathsDataTable] = useState([]);
  const [recoveredDataTable, setRecoveredDataTable] = useState([]);
  const [tabsValue, setTabsValue] = React.useState(0);
  const [countryData, setCountryData] = useState([]);
  const [MapWorld, setMapWorld] = useState([]);
  const [PopupData, setPopupData] = useState();

  useEffect(() => {
    console.log("IN USE EFFECT", selectedCountry);
    let data = {
      mainCountry: "",
      mainSlug: "",
      province: ""
    }
    CountryJson.forEach(value => {
      if (value.Country === selectedCountry.country) {
        if (value.mainCountry) {
          data.mainCountry = value.mainCountry;
          data.mainSlug = value.mainSlug;
          data.province = selectedCountry.country;
        }
        else {
          data.mainCountry = value.Country;
          data.mainSlug = value.Slug;
          data.province = "";
        }
        setCountry(data);
      }
    });
  }, [selectedCountry])

  useEffect(() => {
    var confirmedDataArray = [];
    var deathsDataArray = [];
    var recoveredDataArray = [];
    var CodeAndDeathArray = [];
    console.log("IN TABLE REQUEST");
    if (isRequestSuccess !== true) {
      axios.get("https://api.covid19api.com/summary")
        .then(res => {
          res.data.Countries.forEach(function (item) {
            var confirmedData = {};
            var deathsData = {};
            var recoveredData = {};
            var CodeAndDeath = {};
            confirmedData["left"] = item.Country;
            confirmedData["right"] = item.TotalConfirmed;
            confirmedData["deaths"] = item.TotalDeaths;
            confirmedData["recovered"] = item.TotalRecovered;
            confirmedData["code"] = item.CountryCode;
            deathsData["left"] = item.Country;
            deathsData["right"] = item.TotalDeaths;
            deathsData["confirmed"] = item.TotalConfirmed;
            deathsData["code"] = item.CountryCode;
            recoveredData["left"] = item.Country;
            recoveredData["right"] = item.TotalRecovered;
            recoveredData["code"] = item.CountryCode;
            CodeAndDeath["country"] = item.Country;
            CodeAndDeath["code"] = item.CountryCode;
            CodeAndDeath["death"] = item.TotalDeaths;
            CodeAndDeath["confirmed"] = item.TotalConfirmed;
            CodeAndDeath["recovered"] = item.TotalRecovered;
            CodeAndDeath["latitude"] = ""
            CodeAndDeath["longitude"] = ""
            CodeAndDeath["rayon"] = ""

            CodeAndDeathArray.push(CodeAndDeath);
            confirmedDataArray.push(confirmedData);
            deathsDataArray.push(deathsData)
            recoveredDataArray.push(recoveredData)
          })

          // countryConfirmedCases.sort(sortTotalCases);
          // setCountryData(countryConfirmedCases);
          setMapWorld(CodeAndDeathArray);
          setConfirmedDataTable(confirmedDataArray);
          setDeathsDataTable(deathsDataArray);
          setRecoveredDataTable(recoveredDataArray);
          setUpdateDate(res.data.Date);
          setIsRequestSuccess(true);
        })
        .catch(err => {
          console.log("GRAPH ERRR", err);
          if (isRequestSuccess === false)
            setIsRequestSuccess(null);
          else
            setIsRequestSuccess(false);
        })
    }
  }, [isRequestSuccess, setUpdateDate])

  const [content, setContent] = useState("");

  return (
    <div className={classes.mainContainer}>

      {/* LEFT */}
      <Box className={classes.leftBox}>
          <Box border={2} borderColor={theme.palette.primary.main} className={classes.totalContainer} boxShadow={7}>
            <Total total={total} setTotal={setTotal} setDeaths={setDeaths} setRecovered={setRecovered} setInitialTotal={setInitialTotal} />
          </Box>
          <Box className={classes.tableCountryContainer} boxShadow={7}>
            <Box className={classes.tableHeaderContainer} boxShadow={7} >
              <Box>
                <p>Country Name</p>
              </Box>
              <Box className={classes.rightHeader}>
                <p>Confirmed cases</p>
              </Box>
            </Box>
            <TableCountry
              setSelectedCountry={setSelectedCountry}
              initialTotal={initialTotal}
              setConfirmed={setTotal}
              setDeaths={setDeaths}
              setRecovered={setRecovered}
              data={confirmedDataTable}
              setChartData={setCountryData}
              status="confirmed"
              height="55vh" />
          </Box>
          <Box border={2} borderColor={theme.palette.primary.main} className={classes.updateContainer} boxShadow={7}>
            <Update date={updateDate} />
          </Box>
        </Box>

      {/* CENTER */}

      <Box className={classes.centerBox}>
        <Box className={classes.parentMap}>
          <Box className={classes.mapContainer} boxShadow={3} borderRadius={10}>
            <WorldMap setTooltipContent={setContent} MapWorld={MapWorld} currentCountryCode={selectedCountry.code} setPopupData={setPopupData} />
            <ReactTooltip>{content}</ReactTooltip>
          </Box>
        </Box>
        <Box className={classes.bottomContainer} boxShadow={3} borderRadius={5}>
          <MapPopup popupData={PopupData} />
        </Box>
      </Box>

      {/* RIGHT */}

      <Box className={classes.rightBox}>
        <Box className={classes.rightTablesContainer}>
          <Box className={classes.leftTable}>
            <Box className={classes.leftTableHeaderContainer} boxShadow={7} >
              <Box>
                <p className={classes.tableTitle}>Global deaths</p>
              </Box>
              {deaths === -1 && (
                <div>
                  <CircularProgress className={classes.loading} />
                </div>
              )}
              {deaths !== -1 && (
                <Box>
                  <p className={classes.deathsCount}>{deaths.toLocaleString("fr-FR")}</p>
                </Box>
              )}
            </Box>
            <TableCountry
              setSelectedCountry={setSelectedCountry}
              initialTotal={initialTotal}
              setConfirmed={setTotal}
              setDeaths={setDeaths}
              setRecovered={setRecovered}
              data={deathsDataTable}
              currentCountry={country}
              setChartTabsValue={setTabsValue}
              setChartData={setCountryData}
              status="deaths"
              height="45vh" 
              countColor="#ff0000"
              />
          </Box>
          <Box className={classes.rightTable}>
            <Box className={classes.leftTableHeaderContainer} boxShadow={7} >
              <Box>
                <p className={classes.tableTitle}>Global recovered</p>
              </Box>
              {deaths === -1 && (
                <div>
                  <CircularProgress className={classes.loading} />
                </div>
              )}
              {deaths !== -1 && (
                <Box>
                  <p className={classes.recoveredCount}>{recovered.toLocaleString("fr-FR")}</p>
                </Box>
              )}
            </Box>
            <TableCountry
              setSelectedCountry={setSelectedCountry}
              initialTotal={initialTotal}
              setConfirmed={setTotal}
              setDeaths={setDeaths}
              setRecovered={setRecovered}
              data={recoveredDataTable}
              currentCountry={country}
              setChartTabsValue={setTabsValue}
              setChartData={setCountryData}
              status="recovered"
              height="45vh"
              countColor="#77b200"
            />
          </Box>
        </Box>
        <Box className={classes.chartsContainer} boxShadow={1}>
          <Graph currentCountry={country} tabsValue={tabsValue} setTabsValue={setTabsValue} countryData={countryData} setCountryData={setCountryData} />
        </Box>
      </Box>

    </div >
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: 20
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 5,
      outline: '1px solid slategrey'
    }
  },

  // LEFT

  leftBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "20%",
    height: "95vh",
    marginRight: 15
  },
  totalContainer: {
    width: "100%",
    color: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  tableCountryContainer: {
    width: "100%",
    borderRadius: 5,
    height: "62vh"
  },
  tableHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
  },
  updateContainer: {
    width: "100%",
    color: "white",
    borderRadius: 5,
    textAlign: "center",
  },

  // CENTER

  centerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "60%",
    height: "95vh",
  },
  mapContainer: {
    width: "100%",
    height: "100%"
  },
  bottomContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    height: "50%"
  },
  parentMap: {
    position: "relative"
  },
  hideMapPopup: {
    display: "none"
  },
  mapPopup: {
    position: "absolute",
    top: 0,
    padding: 5,
    width: "30%",
    minHeight: "15%"
  },

  // RIGHT
  rightBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30%",
    marginLeft: 15
  },
  rightTablesContainer: {
    display: "flex",
    jusityContent: "space-between",
    height: "100%",
    marginBottom: 15
  },
  leftTable: {
    width: "100%",
    marginRight: 10
  },
  leftTableHeaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: 0,
    padding: 0
  },
  tableTitle: {
    padding: 0,
    margin: 0
  },
  loading: {
    marginTop: 10
  },
  deathsCount: {
    padding: 0,
    margin: 0,
    fontSize: "2.1vw",
    fontWeight: "bold",
  },
  recoveredCount: {
    padding: 0,
    margin: 0,
    fontSize: "2.1vw",
    fontWeight: "bold",
    color: "#70A800"
  },
  rightTable: {
    width: "100%"
  },
  chartsContainer: {
    width: "100%",
    height: "45%",
    marginRight: 5,
  },
}))

export default App;
