import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import moment from "moment";

function App() {
  let now = moment().format("YYYY-MM-DD");
  const [firstDate, setFirstDate] = useState(now);
  const [date, setdate] = useState();
  const [pickedDates, setPickedDates] = useState([]);
  const [covidData, setcovidData] = useState([]);

  useEffect(() => {
    const result = [];

    for (let i = 0; i <= 6; ++i) {
      result.push(moment(firstDate).add(i, "days").format("YYYY-MM-DD"));
    }

    if (result.length === 7) {
      setPickedDates(result);
    }
  }, [firstDate]);

  useEffect(() => {
    if (pickedDates !== []) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_HOST
        }
      };

      const getAllData = [];
      pickedDates.map((getItem) =>
        fetch(
          `https://covid-19-statistics.p.rapidapi.com/reports/total?date=${getItem}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.data.length !== 0) {
              getAllData.push(response.data);
            }
            if (getAllData.length === 7) {
              setcovidData(
                getAllData.sort((a, b) => moment(a.date) - moment(b.date))
              );
            }
          })
          .catch((err) => console.error(err))
      );
    }
  }, [pickedDates]);

  return (
    <div className="App">
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
            <p style={{ color: "white" }}>{e.date}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
