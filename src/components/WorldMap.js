import React, { memo, useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useZoomPan
} from "react-simple-maps";

import LatLong from "../countrycode-latlong.json"
import theme from "../theme";
import Box from "@material-ui/core/Box"

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json";

// const rounded = num => {
//   if (num > 1000000000) {
//     return Math.round(num / 100000000) / 10 + "Bn";
//   } else if (num > 1000000) {
//     return Math.round(num / 100000) / 10 + "M";
//   } else {
//     return Math.round(num / 100) / 10 + "K";
//   }
// };

const MapChart = ({ setTooltipContent, MapWorld, currentCountryCode, setPopupData }) => {

  const [data, setdata] = useState([]);
  const [countryCoord, setCountryCoord] = useState({
    coordinates: [0, 0],
    zoom: 1
  });

  useEffect(() => {
    if (currentCountryCode !== "") {

      console.log("MAP CURRENT CODE", currentCountryCode.toLowerCase());
      const latitude = LatLong[currentCountryCode.toLowerCase()].lat
      const longitude = LatLong[currentCountryCode.toLowerCase()].long

      setCountryCoord({
        coordinates: [longitude, latitude],
        zoom: 6
      })
    }
  }, [currentCountryCode])

  useEffect(() => {
    var array = MapWorld;
    array.forEach(function (item) {
      if (LatLong[item.code.toLowerCase()]) {
        item.latitude = LatLong[item.code.toLowerCase()].lat
        item.longitude = LatLong[item.code.toLowerCase()].long
      }
      item.rayon = Math.sqrt(item.confirmed) / 50;
    })

    setdata(array)

  }, [MapWorld])

  const CustomZoomableGroup = ({ children, ...restProps }) => {
    const { mapRef, transformString, position } = useZoomPan(restProps);
    return (
      <g ref={mapRef}>
        <rect width={1920} height={1080} fill="transparent" />
        <g transform={transformString}>{children(position)}</g>
      </g>
    );
  };

  return (
    <Box>
      <ComposableMap
        data-tip=""
        projectionConfig={{ scale: 200 }}
        style={{
          width: "100%",
          height: "750",
        }}
      >
        <CustomZoomableGroup zoom={countryCoord.zoom} center={countryCoord.coordinates}>
          {position => (
            <>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none"
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>    
              <>
                {
                  data.map(function (item, index) {
                    return (
                      <Marker key={index}
                        coordinates={[item.longitude, item.latitude]}
                        onClick={() => setPopupData({
                          country: item.country,
                          confirmed: item.confirmed,
                          deaths:  item.death,
                          recovered: item.recovered
                        })}
                        
                      >
                        <circle style={{cursor: "pointer"}} r={item.rayon / position.k} fill={theme.palette.primary.main} stroke="#607D8B" strokeWidth={0.3}/>
                      </Marker>
                    )
                  })
                }
              </>
            </>
          )}
        </CustomZoomableGroup>
      </ComposableMap>
    </Box>
  );
};

export default memo(MapChart);
