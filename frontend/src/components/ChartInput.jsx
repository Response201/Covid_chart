import "chart.js/auto";
import "../App.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

export const ChartInput = ({ chartData, chooseProvince, allProvince }) => {
  const [labelDates, setLabelDates] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [showdata, setShowData] = useState([]);
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
    /* Om datan avser ett län så tas data ut för aktiva och säkrade covid-fall ut från varje datum och sedan så generaras grafen i nästa "useEffect", rad 85  */
    if (chartData.length === 7 && chooseProvince !== "") {
      setLabelDates([]);
      setConfirmedCases([]);
      setActiveCases([]);
      setShowData([]);

      chartData.map((element) => {
        setLabelDates((labelDates) => [...labelDates, element.date]);
        setConfirmedCases((confirmedCases) => [
          ...confirmedCases,
          element.confirmed
        ]);
        setActiveCases((activeCases) => [...activeCases, element.active]);
      });
    } else if (chooseProvince === "") {
      /* Här berarbetas data om ett län saknas och alla läns säkrade covid-fall skall generaras */

      const DataProvince = [];
      /* Här soteras varje län ut */
      allProvince.forEach((e) => {
        const result = [];
        chartData.flat().filter((item) => {
          if (item.region.province === e.province) {
            result.push(item);
          }
        });

        if (result.length === 7) {
          DataProvince.push(result);
        }
      });
      /* När all läng(21st) sorterats så tas aktiva covid-fall ut, samt en label för vilket län datan gäller och en unik fär som visas i grafen */
      if (DataProvince.length === 21) {
        setLabelDates([]);
        const allData = [];
        DataProvince.map((eachDataSet) => {
          const arrayComplete = [];
          setLabelDates([]);
          let labelProvince = "";
          eachDataSet.map((item) => {
            setLabelDates((labelDates) => [...labelDates, item.date]);
            arrayComplete.push(item.active);
            labelProvince = item.region.province;
          });

          if (arrayComplete.length === 7) {
            let randomColor = [];

            for (let i = 0; i < 3; i++) {
              randomColor.push(Math.floor(Math.random() * (256 + 1)));
            }
            if (randomColor.length === 3) {
              allData.push({
                label: labelProvince,
                data: arrayComplete,
                borderColor: `rgba(${randomColor})`
              });
            }
          }

          if (allData.length === 21) {
            setShowData(allData);
          }
        });
      }
    }
  }, [chartData]);

  /* useEffekt för enskilt län, när all data för valda datum generats  */
  useEffect(() => {
    if (activeCases.length === 7 && confirmedCases.length === 7) {
      setShowData((showdata) => [
        ...showdata,
        [
          {
            label: "Confirmed cases",
            data: confirmedCases,
            borderColor: "rgba(0, 95, 115)"
          },

          {
            label: "Active Cases",
            data: activeCases,
            borderColor: "rgb(238, 155, 0)"
          }
        ]
      ]);
    }
  }, [confirmedCases]);

  var options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: { size: window.innerWidth > 400 ? 15 : 8 },
          color: "grey"
        }
      }
    }
  };

  return (
    <div className="canvas-container">
      <Line
        data={{
          labels: labelDates,
          datasets: showdata.flat().map((e) => e)
        }}
        options={options}
      />
    </div>
  );
};
