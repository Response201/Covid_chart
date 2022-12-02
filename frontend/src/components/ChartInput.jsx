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
    } else if (chooseProvince === "") {
      const DataProvince = [];

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
              console.log(Math.floor(Math.random() * (256 + 1)));
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

          console.log(allData);

          if (allData.length === 21) {
            setShowData(allData);
          }
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
