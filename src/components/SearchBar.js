import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// array containing used correct answers (players) that cannot be reused
let usedPlayers = [];

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState(results);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    // get player data from MLB stats API
    if (query !== "") {
      fetch(
        `https://statsapi.mlb.com/api/v1/people/search?names=${query}&hydrate=awards,stats(group=[hitting,pitching],type=[career,yearByYear])`
      )
        .then((res) => res.json())
        .then((data) => setResults(data.people));
    }
    // filter results to only include major league players' names
    setFilteredResults(
      results.filter(
        (result) =>
          query !== "" &&
          result.mlbDebutDate &&
          result.firstLastName // disregards capitalization and accent marks in query
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(query.toLowerCase())
      )
    );
  }, [query, results]);

  // handles inclusion of former team names
  const formerTeamNames = (team) => {
    switch (team) {
      case "Cleveland Indians":
        team = "Cleveland Guardians";
        break;
      case "Florida Marlins":
        team = "Miami Marlins";
        break;
      case "Tampa Bay Devil Rays":
        team = "Tampa Bay Rays";
        break;
      case "California Angels":
        team = "Los Angeles Angels";
        break;
      case "Anaheim Angels":
        team = "Los Angeles Angels";
        break;
      case "Los Angeles Angels of Anaheim":
        team = "Los Angeles Angels";
        break;
      case "Brooklyn Dodgers":
        team = "Los Angeles Dodgers";
        break;
      case "New York Giants":
        team = "San Francisco Giants";
        break;
      case "Montreal Expos":
        team = "Washington Nationals";
        break;
      case "Boston Braves":
        team = "Atlanta Braves";
        break;
      case "Milwaukee Braves":
        team = "Atlanta Braves";
        break;
      case "St. Louis Browns":
        team = "Baltimore Orioles";
        break;
      case "New York Highlanders":
        team = "New York Yankees";
        break;
      case "Boston Americans":
        team = "Boston Red Sox";
        break;
      case "Washington Senators":
        team = "Minnesota Twins";
        break;
      case "Kansas City Athletics":
        team = "Oakland Athletics";
        break;
      case "Philadelphia Athletics":
        team = "Oakland Athletics";
        break;
    }

    return team;
  };

  const handleGuess = (e) => {
    console.log(e.target.value);
    props.handleClose(); // closes search bar modal after guess
    props.handleGuessesRemaining(); // update guess counter

    // get player data
    const playerIndex = e.target.value;
    console.log(playerIndex);
    const playerData = filteredResults[playerIndex];
    const stats = playerData["stats"];
    const teamsPlayedFor = [];
    stats.forEach((item) => {
      if (item.type.displayName === "yearByYear") {
        item.splits.forEach((year) => {
          if (year.team) {
            if (teamsPlayedFor.indexOf(formerTeamNames(year.team.name)) === -1)
              teamsPlayedFor.push(formerTeamNames(year.team.name));
          }
        });
      }
    });

    // handles correct guess interface action
    if (
      teamsPlayedFor.includes(props.selectedCategory.split(",")[0]) &&
      teamsPlayedFor.includes(props.selectedCategory.split(",")[1]) &&
      usedPlayers.indexOf(playerData.id) === -1
    ) {
      usedPlayers = [...usedPlayers, playerData.id];
      setQuery("");
      const rightAnswer = document.createElement("div");
      rightAnswer.className = "correct-player-container";
      rightAnswer.innerHTML = `<img class="player-headshot" src="https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${playerData.id}/headshot/67/current" />
                                                                        <div class="player-name">${playerData.firstLastName}</div>`;

      const btn = document.getElementById(props.selectedBox);
      const parent = btn.parentNode;

      parent.replaceChild(rightAnswer, btn);
      rightAnswer.setAttribute("id", props.selectedBox);
    }
  };

  return (
    <>
      <div className="search-box">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          autoFocus
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="results-container">
        {filteredResults.map((result, index) => {
          return (
            <ul className="results-list" key={index}>
              <li className="result-list-item">
                {`${result.firstLastName} `}
                {`(${JSON.stringify(result.mlbDebutDate).substring(1, 5)} - ${
                  result.lastPlayedDate
                    ? JSON.stringify(result.lastPlayedDate).substring(1, 5)
                    : ""
                })`}
                {usedPlayers.indexOf(result.id) === -1 ? (
                  <Button
                    variant="success"
                    type="submit"
                    value={index}
                    onClick={handleGuess}
                  >
                    Select
                  </Button>
                ) : (
                  <span>Already used</span>
                )}
              </li>
              <br />
            </ul>
          );
        })}
      </div>
    </>
  );
}
export default SearchBar;
