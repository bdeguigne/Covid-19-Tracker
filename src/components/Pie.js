import React from 'react';
import Chart from 'react-apexcharts'

const Donut = ({ data }) => {

  var infos = null
  if (data) {
    infos = {
      options: {
        labels: ["Confirmed", "Deaths", "Recovered"],
        legend: {
          labels: {
              colors: ['#FFFFF']
          }
        }
      },
      series: [data.confirmed, data.deaths, data.recovered],
    };
  }

  return (
    <>
      {data && (
        <div className="donut">
          <Chart options={infos.options} series={infos.series} type="donut" width="260" />
        </div>
      )}
    </>
  );

}


export default Donut;