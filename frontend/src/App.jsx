import { useState, useEffect } from "react";
import "./App.css";
import moment from "moment";
import { ChartInput } from "./components/ChartInput";
import { SelectProvince } from "./components/SelectProvince";

function App() {
  let now = moment().subtract(1, "days").format("YYYY-MM-DD");
  const [firstDate, setFirstDate] = useState(now);;
  const [pickedDates, setPickedDates] = useState([]);
  const [chooseProvince, setChooseProvince] = useState("");
  const [covidData, setcovidData] = useState([]);
  const [allProvince, setAllProvince] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_HOST
    }
  };

  useEffect(() => {
    const result = [];
    for (let i = 0; i <= 6; ++i) {
      result.push(moment(firstDate).add(-i, "days").format("YYYY-MM-DD"));
    }

    if (result.length === 7) {
      setPickedDates(result);
    }
  }, [firstDate]);

  const OnClickGeneratData = () => {
    setcovidData([]);
    let getAllData = [];
    if (pickedDates.length === 7) {
      pickedDates.map((getItem) => {
        let url = "";

        if (chooseProvince !== "") {
          url = `${
            import.meta.env.VITE_BASE_URL
          }/reports?region_province=${chooseProvince}&iso=SWE&date=${getItem}`;
        } else if (chooseProvince === "") {
          url = `${
            import.meta.env.VITE_BASE_URL
          }/reports?iso=SWE&date=${getItem}`;
        }

        fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            if (response.data.length !== 0 && chooseProvince !== "") {
              getAllData.push(response.data[0]);
            } else if (response.data && chooseProvince === "") {
              getAllData.push(response.data);
            }

            if (getAllData.length === 7 && chooseProvince !== "") {
              setcovidData(
                getAllData.sort((a, b) => moment(a.date) - moment(b.date))
              );
            } else if (getAllData.length === 7 && chooseProvince === "") {
              setcovidData(
                getAllData.sort((a, b) => moment(a[0].date) - moment(b[0].date))
              );
            }
          })
          .catch((err) => console.error(err));
      });
    }
  };

  return (
    <article className="App">
      <section className="DateAndProvinceInput___container">
        <div className="DateAndProvinceInput___content">
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
            min="2020-06-14"
            max={now}
            onChange={(e) => {
              setFirstDate(e.target.value);
            }}
          />

          <div>
            {pickedDates ? (
              <p>
                {pickedDates[6]} - {pickedDates[0]}
              </p>
            ) : (
              ""
            )}
          </div>

          <button onClick={OnClickGeneratData}> Generate data </button>
        </div>
      </section>

      {covidData.length >= 7 ? (
        <section className="chartInput___container">
          <ChartInput
            chartData={covidData}
            chooseProvince={chooseProvince}
            allProvince={allProvince}
          />
        </section>
      ) : (
        ""
      )}
    </article>
  );
}

export default App;
