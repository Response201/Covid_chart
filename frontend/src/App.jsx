import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import moment from "moment";
import { ChartInput } from "./components/ChartInput";
import { SelectProvince } from "./components/SelectProvince";

function App() {
  let now = moment().format("YYYY-MM-DD");
  const [firstDate, setFirstDate] = useState(now);
  const [date, setdate] = useState();
  const [pickedDates, setPickedDates] = useState([]);
  const [chooseProvince, setChooseProvince] = useState("");
  const [covidData, setcovidData] = useState([]);
  const [allProvince, setAllProvince] = useState([]);
  const [url, setUrl] = useState();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_HOST
    }
  };

  useEffect(() => {
    const result = [];

    if (now !== firstDate) {
      setPickedDates([]);
      for (let i = 0; i <= 6; ++i) {
        result.push(moment(firstDate).add(i, "days").format("YYYY-MM-DD"));
      }

      if (result.length === 7) {
        setPickedDates(result);
      }
    } else {
    }
  }, [firstDate]);

  useEffect(() => {
    if (pickedDates.length === 7 && chooseProvince !== "") {
      const getAllData = [];
      pickedDates.map((getItem) =>
        fetch(
          `https://covid-19-statistics.p.rapidapi.com/reports?region_province=${chooseProvince}&iso=SWE&date=${getItem}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.data.length !== 0) {
              getAllData.push(response.data[0]);
            }

            if (getAllData.length === 7) {
              setcovidData(
                getAllData.sort((a, b) => moment(a.date) - moment(b.date))
              );
            }
          })
          .catch((err) => console.error(err))
      );
      setPickedDates([]);
    } else if (pickedDates.length === 7 && chooseProvince === "") {
      const getAllData = [];
      pickedDates.map((getItem) =>
        fetch(
          `https://covid-19-statistics.p.rapidapi.com/reports?iso=SWE&date=${getItem}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.data.length !== 0) {
              getAllData.push(response.data);
            }

            if (getAllData.length === 7) {
              setcovidData(
                getAllData.sort((a, b) => moment(a[0].date) - moment(b[0].date))
              );
            }
          })
          .catch((err) => console.error(err))
      );
    }
  }, [pickedDates, chooseProvince]);

  return (
    <div className="App">
      <SelectProvince
        options={options}
        chooseProvince={chooseProvince}
        setChooseProvince={setChooseProvince}
        setAllProvince={setAllProvince}
        allProvince={allProvince}
      />

      <input
        type="date"
        value={firstDate}
        onChange={(e) => {
          setFirstDate(e.target.value);
        }}
      />

      {covidData &&
        covidData.map((e) => (
          <div key={e.date}>
            <p style={{ color: "white" }}>
              {!chooseProvince ? e[0].date : e.date}
            </p>
          </div>
        ))}

      <ChartInput
        chartData={covidData}
        chooseProvince={chooseProvince}
        allProvince={allProvince}
      />
    </div>
  );
}

export default App;
