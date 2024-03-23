import "./App.css";
import "./ApiTools.js";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const API_URL = "na1.api.riotgames.com";
const API_KEY = process.env.REACT_APP_API_KEY;

let iconID = 0;
let iconURL = `http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${iconID}.png`;

export default function App() {
  const [summonerData, setSummonerData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [textInput, setTextInput] = useState("");

  /*
  The profile icons are taken from Data Dragon.
  The first element in the array is the current version.
  This should eventually be automatically scripted but for now it is manual. 
  This can be automated by grabbing the array and extracting the first element to get the newest API version.
  https://ddragon.leagueoflegends.com/api/versions.json
  */
  useEffect(() => {
    // Summoner name length is between 3 and 16 characters inclusive.
    if (textInput.length >= 3 && textInput.length <= 16) {
      const fetchData = async () => {
        try {
          const summonerResponse = await fetch(
            `https://${API_URL}/lol/summoner/v4/summoners/by-name/${textInput}?api_key=${API_KEY}`
          );
          const summonerJson = await summonerResponse.json();
          setSummonerData(summonerJson);
          iconID = summonerJson.profileIconId;
          iconURL = `http://ddragon.leagueoflegends.com/cdn/14.3.1/img/profileicon/${iconID}.png`;

          const leagueResponse = await fetch(
            `https://${API_URL}/lol/league/v4/entries/by-summoner/${summonerJson.id}?api_key=${API_KEY}`
          );
          const leagueJson = await leagueResponse.json();
          setLeagueData(leagueJson);
          console.log(leagueData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [textInput]);

  const handleTextFieldChange = (event) => {
    setTextInput(event.target.value);
  };

  function renderSummonerData() {
    if (summonerData && summonerData.name !== "Undefined") {
      return (
        <div>
          {/* Debugging */}
          {/* summonerData:
          <pre>{JSON.stringify(summonerData, null, 2)}</pre> */}
          <Typography variant="h5" component="div">
            {summonerData.name}
          </Typography>
          <Typography variant="h6" component="div">
            Level: {summonerData.summonerLevel}
          </Typography>
          <br />
        </div>
      );
    } else if (textInput) {
      return <pre>No summoner data found.</pre>;
    }
  }

  function renderSummonerIcon() {
    if (summonerData && summonerData.name !== "Undefined") {
      return <img id="summonerIcon" src={iconURL} alt="icon" />;
    }
  }

  function renderLeagueRanks() {
    const divs = [];

    if (leagueData) {
      for (let i = 0; i < leagueData.length; i++) {
        divs.push(
          <div>
            <Card
              sx={{
                width: "20rem",
                minHeight: 200,
                margin: "auto",
                textAlign: "left",
                marginBottom: "1rem",
              }}
              variant="outlined"
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {leagueData[i].queueType === "RANKED_SOLO_5x5"
                    ? "SOLO/DUO"
                    : "FLEX"}
                </Typography>
                <Typography variant="h6" component="div">
                  {leagueData[i].tier} {leagueData[i].rank}
                </Typography>
                <Typography variant="h7" component="div">
                  Total matches: {leagueData[i].wins + leagueData[i].losses}
                </Typography>
                <Typography variant="h7" component="div">
                  Wins: {leagueData[i].wins}
                </Typography>
                <Typography variant="h7" component="div">
                  Losses: {leagueData[i].losses}
                </Typography>
                <br />
                <Typography variant="h7" component="div">
                  Win-loss ratio:{" "}
                  {(leagueData[i].wins / leagueData[i].losses).toFixed(2)}
                </Typography>
                <Typography variant="h7" component="div">
                  Win-loss rate:{" "}
                  {(
                    (leagueData[i].wins /
                      (leagueData[i].losses + leagueData[i].wins)) *
                    100
                  ).toFixed(1) + "%"}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      }

      if (divs.length !== 0) {
        return divs;
      } else {
        return <pre>No rank data found.</pre>;
      }
    }
  }

  return (
    <div className="App">
      <body>
        <div className="search">
          <TextField
            id="standard-basic"
            label="search player"
            variant="standard"
            onChange={handleTextFieldChange}
          />
        </div>

        {renderSummonerIcon()}
        {renderSummonerData()}
        {renderLeagueRanks()}
        {/* {renderRecentMatches()} */}

        <div className="footer">
          <div className="disclaimer">
            ward-bot is not endorsed by Riot Games and does not reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing Riot Games properties. Riot Games and all
            associated properties are trademarks or registered trademarks of
            Riot Games, Inc.
          </div>
        </div>
      </body>
    </div>
  );
}
