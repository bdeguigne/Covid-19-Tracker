import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  container: {
    display: "inline-block",
    height: props => props.height
  },
  table: {
    maxWidth: 650,
  },
  row: {
    cursor: "pointer",
  },
  clickedRow: {
    cursor: "pointer",
    backgroundColor: theme.palette.table.main,
    '&:hover': {
      backgroundColor: theme.palette.table.hover + "!important",
    },
  },
  // tableHeaderContainer: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   padding: 10,
  // },
  rightCell: {
    fontWeight: "bold",
    color: props => props.color
  },
  rightHeader: {
    textAlign: "right"
  }
}));

const SimpleTable = ({ setSelectedCountry, initialTotal, setConfirmed, setDeaths, setRecovered, data, currentCountry, setChartData, status, height, countColor }) => {
  const color = countColor ? countColor : "white";
  const classes = useStyles({ height, color });
  const [countryData, setCountryData] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const sortTotalCases = (a, b) => {
    const casesA = a.right;
    const casesB = b.right;

    let comparison = 0;
    if (casesA > casesB) {
      comparison = -1;
    } else if (casesA < casesB) {
      comparison = 1;
    }
    return comparison;
  }

  useEffect(() => {
  }, [initialData])
  useEffect(() => {
    if (countryData.length > 0 && initialData === null) {
      setInitialData(countryData);
    }
  }, [countryData, initialData])

  useEffect(() => {
    if (currentCountry && currentCountry.mainCountry !== "") {
      const elem = data.find(item => {
        return item.left === currentCountry.mainCountry
      })
      if (status === "deaths") {
        setConfirmed(elem.confirmed);
        setDeaths(elem.right);
      }
      if (status === "recovered") {
        setRecovered(elem.right);
      }
    }
  }, [currentCountry, data, setConfirmed, setDeaths, setRecovered, status])

  useEffect(() => {
    data.sort(sortTotalCases);
    setCountryData(data);
  }, [data])

  const handleRowClick = ((country, cases, code) => {
    if (activeCountry !== country) {
      console.log("CLICKED CODE", code);
      setActiveCountry(country);
      setSelectedCountry({
        country: country,
        code: code
      });
      if (status === "confirmed") {
        setConfirmed(cases);
      }
      else if (status === "deaths") {
        setDeaths(cases);
      }
    }
    else {
      console.log("DESELECT");
      setActiveCountry(null);
      setSelectedCountry({
        country: "",
        code: ""
      });
      setDeaths(initialTotal.deaths);
      setConfirmed(initialTotal.confirmed);
      setRecovered(initialTotal.recovered);
      setChartData([]);
      // setCountryData(initialData);
    }
  })

  const ClickableRow = ({ leftElement, rightElement, code, isActive, onClick }) => {
    const handleClick = (left, right, code) => onClick(left, right, code)

    return (
      <TableRow className={isActive ? classes.clickedRow : classes.row} hover key={leftElement} onClick={() => handleClick(leftElement, rightElement, code)}>
        <TableCell component="th" scope="row">
          {leftElement}
        </TableCell>
        <TableCell className={classes.rightCell} align="right">{rightElement.toLocaleString("fr-FR")}</TableCell>
      </TableRow>
    )
  }

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableBody>
            {countryData.length > 1 && countryData.map(function (row) {
              return (
                <ClickableRow
                  key={row.left}
                  leftElement={row.left}
                  rightElement={row.right}
                  code={row.code}
                  isActive={activeCountry === row.left}
                  onClick={handleRowClick} />
              )
            })}
            {/* {countryData.left && (
              <ClickableRow
                key={countryData.left}
                leftElement={countryData.left}
                rightElement={countryData.right}
                isActive={activeCountry === countryData.left}
                onClick={handleRowClick}
              />
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SimpleTable;
