// import React, { useState, useEffect } from "react";
// import Graph from "./Graph";
// // import Tabs from '@material-ui/core/Tabs';
// // import Tab from '@material-ui/core/Tab';

// const CaseCharts = ({ currentCountry, setTotal }) => {
//   const [country, setCountry] = useState(currentCountry);
//   // const [tabsValue, setTabsValue] = React.useState(0);
//   // const [status, setStatus] = React.useState("confirmed");

//   useEffect(() => {
//     console.log("CASE CHARTS USE EFFECT");
//     if (country !== currentCountry) {
//       setCountry(currentCountry);
//       console.log("SET COUNTRY");
//     }
//   }, [country, currentCountry])

//   // const handleChange = (event, newValue) => {
//   //   console.log(newValue);
//   //   setTabsValue(newValue);
//   //   if (newValue === 0)
//   //     setStatus("confirmed")
//   //   else if (newValue === 1)
//   //     setStatus("recovered")
//   //   else if (newValue === 2)
//   //     setStatus("deaths")
//   // }
//   return (
//     <div key={country}>
//       <Graph country={country} setTotal={setTotal}/>
//     </div>
//   )
// }

// export default CaseCharts;