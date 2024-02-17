import "./App.css";
import "./ApiTools.js";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const API_URL = "na1.api.riotgames.com";

const API_KEY = process.env.REACT_APP_API_KEY;

let summonerName;
let iconID = 0;
let iconURL = `http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${iconID}.png`;

export default function App() {
  const [data, setData] = useState(null);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    // Summoner name length is between 3 and 16 characters inclusive.
    if (textInput.length >= 3 && textInput.length <= 16) {
      fetch(
        `https://${API_URL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          iconID = json.profileIconId;
          iconURL = `http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${iconID}.png`;
        })
        .catch((error) => console.error(error));
    }
  }, [textInput]);

  const handleTextFieldChange = (event) => {
    setTextInput(event.target.value);
    summonerName = event.target.value;
  };

  function renderData() {
    if (data && data.name !== "Undefined") {
      return (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          NAME:
          <pre>{data.name}</pre>
          LEVEL:
          <pre>{data.summonerLevel}</pre>
        </div>
      );
    } else {
      return <pre>"No data found."</pre>;
    }
  }

  return (
    <div className="App">
      <div className="search">
        <TextField
          id="standard-basic"
          label="search"
          variant="standard"
          onChange={handleTextFieldChange}
        />
      </div>

      {renderData()}
      <img src={iconURL} alt="icon" />
    </div>
  );
}
