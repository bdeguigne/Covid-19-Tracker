import React, { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import theme from "../theme"
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Graph = ({ currentCountry, tabsValue, setTabsValue, countryData, setCountryData}) => {
  const [country, setCountry] = useState(currentCountry);
  // const [tabsValue, setTabsValue] = React.useState(0);
  const [status, setStatus] = React.useState("confirmed");
  let printedName = "";
  if (status === "confirmed")
  printedName = "Total confirmed";
  else if (status === "recovered")
  printedName = "Total recovered";
  else
  printedName = "Total deaths";

  useEffect(() => {
    console.log("CASE CHARTS USE EFFECT", currentCountry);
    if (country !== currentCountry) {
      setCountry(currentCountry);
      console.log("SET COUNTRY");
    }
  }, [country, currentCountry])

  useEffect(() => {
    setCountryData([]);
    const countryConfirmedCases = [];
    console.log("HEY COUNTRY", country)
    if (country.mainCountry !== "") {
      axios.get(`https://api.covid19api.com/total/dayone/country/${country.mainSlug}/status/${status}`, { "headers": { "Access-Control-Allow-Origin": '*' } })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          res.data.forEach(function (item) {
              var data = {}
              if (item.Country === country.mainCountry && item.Province === country.province) {
                data["x"] = item.Date;
                data["y"] = item.Cases;
                countryConfirmedCases.push(data);
              }
            })
            setCountryData(countryConfirmedCases);
          }
        })
      }
  }, [country, status, printedName, setCountryData])
  
  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: "100%",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom"
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: printedName + " evolution",
      align: "left",
      style: {
        color: "white"
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        hadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    markers: {
      size: 0
    },
    tooltip: {
      theme: "dark"
    },
    colors: [theme.palette.primary.main],
    yaxis: {
      title: {
        text: "Cases",
        style: {
          color: "white"
        }
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString("fr-Fr")
        },
        style: {
          colors: "white"
        }
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "white"
        }
      }
    },
  }
  const series = [
    {
      name: "",
      data: countryData
    },
  ]
  
  const handleChange = (event, newValue) => {
    console.log(newValue);
    if (newValue === 0) {
      setStatus("confirmed");
      // setTotal(-1);
    }
    else if (newValue === 1)
    setStatus("deaths")
    else if (newValue === 2) {
      setStatus("recovered")
      // setDeaths(-1);
    }
    setTabsValue(newValue);
  }
  
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        />
      <Tabs value={tabsValue} onChange={handleChange} indicatorColor="primary" >
        <Tab label="Confirmed" />
        <Tab label="Deaths" />
        <Tab label="Recovered" />
      </Tabs>
    </div>
  )
}

export default Graph;
