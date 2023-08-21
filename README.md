# MLB Immaculate Grid Clone

## Description
A clone based on the popular [Immaculate Grid web game](https://www.immaculategrid.com/), made using React.

## How to Run the Project
1. Clone this repository by entering the following into your terminal: 
```bash
git clone https://github.com/dannyjimenez98/MLB-Grid-Game.git
```
2. Change into project's directory
```bash
cd mlb-grid
```
3. Install dependencies
```bash
npm install
```
4. Start the development server
```bash
npm start
```
This should open the browser automatically, but if it does not, just go to `http://localhost:3000` to play.
5. Guess away and have fun!

## How to Play
- The game consists of a 3x3 grid with six different teams positioned at the beginning of each row and column of squares on the grid.
- Each square on the grid corresponds with the two MLB teams from the same row and column. The goal is to guess an MLB player that played at least one game for both teams in his career. 
- Each player can only be used once.
- You have 9 chances to correctly answer the nine squares on the board.
- To make a guess, click on a square and type in a player you think would work as an answer for that square and click the green 'Select' button next to their name.

## Screenshots
![Project Screenshot Grid](<mlb_grid_screenshot1.png>)
![Project Screenshot Guess](<mlb_grid_screenshot2.png>)

## Credits
- Original Game: [Immaculate Grid](https://www.immaculategrid.com/)
- API: [MLB Stats API](https://statsapi.mlb.com/)
