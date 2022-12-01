import "chart.js/auto";
import { enableMapSet } from "immer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

export const ChartInput = ({ chartData, chooseProvince, allProvince }) => {
  const [labelDates, setLabelDates] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [showdata, setShowData] = useState([]);
  const [activeCases, setActiveCases] = useState([]);
  const [activeDiff, setActiveDiff] = useState([]);

  const Try = () => {
    if (chartData.length === 7 || array) {
      setLabelDates([]);
      setConfirmedCases([]);
      setActiveCases([]);
      setActiveDiff([]);
      setShowData([]);

      chartData.forEach((element) => {
        setLabelDates((labelDates) => [...labelDates, element.date]);
        setConfirmedCases((confirmedCases) => [
          ...confirmedCases,
          element.confirmed
        ]);
        setActiveCases((activeCases) => [...activeCases, element.active]);
      });

      if (activeCases && confirmedCases) {
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
    }
  };

  useEffect(() => {
    if (chartData.length === 7 && chooseProvince !== "") {
      Try();
    } else if (chooseProvince === "") {
      const hey = [];

      allProvince.forEach((e) => {
        const result = [];
        chartData.flat().filter((item) => {
          if (item.region.province === e.province) {
            result.push(item);
          }
        });

        if (result.length === 7) {
          hey.push(result);
        }
      });

      if (hey.length === 21) {
        hey.map((eachDataSet) => {
          eachDataSet.map((item) => {});
        });
      }
    }
  }, [chartData]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Line
        data={{
          labels: labelDates,
          datasets: showdata.flat().map((e) => e)
        }}
        height={400}
        width={600}
      />
    </div>
  );
};
