import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Grid() {
    const teams = {
        "Arizona Diamondbacks" : "https://www.mlbstatic.com/team-logos/team-cap-on-dark/109.svg", 
        "Baltimore Orioles": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/110.svg", 
        "Chicago Cubs": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/112.svg", 
        "Cincinnati Reds": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/113.svg", 
        "Colorado Rockies": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/115.svg", 
        "Houston Astros": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/117.svg", 
        "Los Angeles Angels": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/108.svg", 
        "Miami Marlins": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/146.svg", 
        "Minnesota Twins" : "https://www.mlbstatic.com/team-logos/team-cap-on-dark/142.svg", 
        "New York Yankees": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/147.svg", 
        "Philadelphia Phillies": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/143.svg", 
        "San Diego Padres": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/135.svg", 
        "San Francisco Giants": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/137.svg", 
        "Seattle Mariners": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/136.svg", 
        "Tampa Bay Rays": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/139.svg", 
        "Texas Rangers": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/140.svg", 
        "Toronto Blue Jays": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/141.svg", 
        "Washington Nationals": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/120.svg", 
        "Atlanta Braves": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/144.svg", 
        "Boston Red Sox": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/111.svg", 
        "Chicago White Sox": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/145.svg", 
        "Cleveland Guardians": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/114.svg", 
        "Detroit Tigers": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/116.svg", 
        "Kansas City Royals": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/118.svg", 
        "Los Angeles Dodgers": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/119.svg", 
        "Milwaukee Brewers": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/158.svg", 
        "New York Mets": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/121.svg", 
        "Oakland Athletics": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/133.svg", 
        "Pittsburgh Pirates": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/134.svg", 
        "St. Louis Cardinals": "https://www.mlbstatic.com/team-logos/team-cap-on-dark/138.svg", 
    }

    const [show, setShow] = useState(false);
    const [selectedBox, setSelectedBox] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [guessesRemaining, setGuessesRemaining] = useState(9);
    const [gameCategories, setGameCategories] = useState([]);

    const handleGuessesRemaining = () => setGuessesRemaining(guessesRemaining - 1);
    if (guessesRemaining === 0) {
        const gridButtons = document.getElementsByClassName("grid-btn");
        console.log(gridButtons.length);
        for (let i = (gridButtons.length - 1); i >=0; i--){
            gridButtons[i].disabled = true;
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        setSelectedBox(e.target.id);
        setSelectedCategory(e.target.value);
    }

    const date = new Date();
    const currentDate = date.getDate()

    // FIX => make teams randomize only once per day, not on refresh
    useEffect(() => {
        const randomizedCategoriesArr = [];
        while (randomizedCategoriesArr.length < 6) {
            let randomTeam = Object.keys(teams)[Math.floor(Math.random() * Object.keys(teams).length)]
            if (randomizedCategoriesArr.indexOf(randomTeam) === -1) {
                randomizedCategoriesArr.push(randomTeam);
            }
        }
        setGameCategories(randomizedCategoriesArr);
    }, [currentDate])

    // populate grid categories array
    // only teams for now, add stats and award categories later
    const gridAnswerLoc = {
        "box1": [gameCategories[0], gameCategories[3]],
        "box2": [gameCategories[1], gameCategories[3]],
        "box3": [gameCategories[2], gameCategories[3]],
        "box4": [gameCategories[0], gameCategories[4]],
        "box5": [gameCategories[1], gameCategories[4]],
        "box6": [gameCategories[2], gameCategories[4]],
        "box7": [gameCategories[0], gameCategories[5]],
        "box8": [gameCategories[1], gameCategories[5]],
        "box9": [gameCategories[2], gameCategories[5]]
    };

    return (
    <>
    <h1>MLB Grid Game</h1>
    <div className="search-container">
        <Modal show={show} onHide={handleClose} dialogClassName="search-results">
            <SearchBar 
            selectedBox={selectedBox}
            selectedCategory={selectedCategory}
            handleClose={handleClose}
            handleGuessesRemaining={handleGuessesRemaining}
            />
        </Modal>
    </div>
    <div className="grid-container">
            <div className="grid col-md-6 col-sm-6">
                { guessesRemaining > 0 ? 
                    <div className="box">{guessesRemaining} <h2>Guesses Remaining</h2></div> 
                    : <div className="box"><h2>Game Over!</h2></div> }
                <div className="box" id="teamA"><img src={teams[gameCategories[0]]} alt="" /></div>
                <div className="box" id="teamB"><img src={teams[gameCategories[1]]} alt="" /></div>
                <div className="box" id="teamC"><img src={teams[gameCategories[2]]} alt="" /></div>

                <div className="box" id="team1"><img src={teams[gameCategories[3]]} alt="" /></div>
                <Button className="grid-btn box" variant="secondary" id="box1" onClick={handleShow} value={gridAnswerLoc["box1"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box2" onClick={handleShow} value={gridAnswerLoc["box2"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box3" onClick={handleShow} value={gridAnswerLoc["box3"]}></Button>

                <div className="box" id="team2"><img src={teams[gameCategories[4]]} alt="" /></div>
                <Button className="grid-btn box" variant="secondary" id="box4" onClick={handleShow} value={gridAnswerLoc["box4"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box5" onClick={handleShow} value={gridAnswerLoc["box5"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box6" onClick={handleShow} value={gridAnswerLoc["box6"]}></Button>

                <div className="box" id="team3"><img src={teams[gameCategories[5]]} alt="" /></div>
                <Button className="grid-btn box" variant="secondary" id="box7" onClick={handleShow} value={gridAnswerLoc["box7"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box8" onClick={handleShow} value={gridAnswerLoc["box8"]}></Button>
                <Button className="grid-btn box" variant="secondary" id="box9" onClick={handleShow} value={gridAnswerLoc["box9"]}></Button>
            </div>
    </div>    
    </>
  )
}
export default Grid;

