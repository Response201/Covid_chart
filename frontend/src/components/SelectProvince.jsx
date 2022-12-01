import { useEffect, useState } from "react";

export const SelectProvince = ({
  options,
  chooseProvince,
  setChooseProvince,
  setAllProvince,
  allProvince
}) => {
  useEffect(() => {
    fetch(
      "https://covid-19-statistics.p.rapidapi.com/provinces?iso=SWE",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data.length !== 0) {
          setAllProvince(response.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <select
        value={chooseProvince}
        onChange={(e) => setChooseProvince(e.target.value)}
      >
        {allProvince &&
          allProvince.map((e) => (
            <option key={e.province} value={e.province}>
              {" "}
              {e.province === "" ? "Alla Län" : e.province}{" "}
            </option>
          ))}
      </select>
    </div>
  );
};
