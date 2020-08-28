import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const Item = ({ total, setTotal, setDeaths, setRecovered, setInitialTotal}) => {

  useEffect(() => {
    axios.get("https://covid-19-statistics.p.rapidapi.com/reports/total", {
      headers: {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": "3c5c0043ddmsh0e893e57f831f61p13ffc2jsne0a414d75852",
        "useQueryString": true
      }
    })
      .then(res => {
        console.log("TOTAL REQUEST", res.data);
        setInitialTotal({
          confirmed: res.data.data.confirmed, 
          deaths: res.data.data.deaths,
          recovered: res.data.data.recovered
        })
        setTotal(res.data.data.confirmed);
        setDeaths(res.data.data.deaths);
        setRecovered(res.data.data.recovered);
      })
  }, [setTotal, setDeaths, setRecovered, setInitialTotal]);

  const classes = useStyles()
  return (
    <div>
      <p className={classes.title}>Total confirmed</p>
      {total === -1 && (
        <div>
          <CircularProgress className={classes.loading}/>
        </div>
      )}
      {total !== -1 && (
        <div>
          <p className={classes.number}>{total.toLocaleString("fr-FR")}</p>
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  title: {
    margin: 0,
    marginTop: 10,
    fontSize: "1vw"
  },
  number: {
    margin: 0,
    fontSize: "2.5vw",
    fontWeight: "bold",
    color: theme.palette.primary.main
  },
  loading: {
    marginTop: 10
  }
}))

export default Item