# Golos

![G__1_-removebg-preview](https://user-images.githubusercontent.com/50679150/173246223-23cc27e9-760e-4a12-8a2d-06bbe6c630a0.png)

> A multiplayer Dots and Boxes implementation with a minimax AI opponent.
> Built in 2022 as a student project. **Archived — kept public for portfolio and reference.**

Golos is my web implementation of [Dots and Boxes](https://en.wikipedia.org/wiki/Dots_and_boxes) — the classic pen-and-paper game known in Nepali schools as *Golo Jodne* ("joining circles"). Players take turns drawing edges between dots on a grid; whoever closes the fourth side of a square claims it. Whoever claims the most squares when the board fills wins.

The project supports two modes:

- **Multiplayer** — 2 or more players sharing a real-time game over a client/server connection
- **Single-player vs. AI** — play against a minimax-based agent with three difficulty levels

## The AI

The single-player opponent uses **minimax search** over the game tree. The three difficulty levels — Easy, Medium, Hard — map to increasing search depth:

- **Easy** — shallow search; plays like a casual human, makes the kind of mistakes that give away free squares
- **Medium** — moderate depth; competent positional play, avoids obvious blunders
- **Hard** — deep search; plays close to optimally on small boards, slower to respond on larger ones

Dots and Boxes is mathematically richer than its appearance suggests. It's PSPACE-hard on general graphs, and serious play involves chain theory and the *double-cross strategy*. The AI here doesn't implement the full chain-theoretic apparatus — it's a straightforward minimax with a square-count heuristic — but at sufficient depth on a small board it plays a credible game.

## Stack

- **Client** — vanilla JavaScript, HTML, CSS
- **Server** — Node.js (handles real-time multiplayer state and turn management)
- **Repo split** — `client/` and `server/` directories

## Quick start

> The install commands below are conventional defaults. If they don't work out-of-the-box, check `client/package.json` and `server/package.json` for the actual scripts.

```bash
# Clone the repo
git clone https://github.com/DexA1948/Golos.git
cd Golos

# Install and start the server
cd server
npm install
npm start

# In a second terminal, serve the client
cd ../client
npm install
npm start
```

Then open the client URL printed in the terminal (typically `http://localhost:3000` or similar). For multiplayer, open the same URL in a second browser tab or on a second device on the same network.

## Why I built it

I grew up playing Golo Jodne on the back pages of school notebooks during long classes. In 2022, while studying CSIT at Tribhuvan University, I wanted to see if I could turn a pen-and-paper game I'd known since childhood into a real-time multiplayer web app — and use it as an excuse to learn game tree search.

In hindsight the project taught me the same instincts I now apply to production real-time systems at work: state representation, turn-based event flow, keeping multiple clients in sync, and reasoning about what the "next move" should be when you can't enumerate every possibility.

I open-sourced it from day one in case other students wanted to learn from or contribute to it.

## Status

This repository is **no longer actively maintained**. It's preserved as a historical and portfolio artifact. Issues and pull requests will not be reviewed promptly (or at all). Feel free to fork it and take it further.

## License

No formal license — treat as "all rights reserved" by default. If you want to reuse code, [open an issue](https://github.com/DexA1948/Golos/issues) or reach out and we can sort it out.

## About the author

Built by **Deshant Devkota** while a CSIT student at Tribhuvan University.
Now a Senior Full-Stack Engineer working on real-time AWS / IoT systems.

[github.com/dexA1948](https://github.com/dexA1948) · [linkedin.com/in/deshantdevkota](https://linkedin.com/in/deshantdevkota)



::::::::::


Golo Jodne ( I called it Golos so it would be easier) is a game I played as a kid in school. This is a multiplayer game ( 2 or more players, 2/3 players are good ) in which we first draw a matrix of small circles/dots on our copy/paper which serves as a playground. Each player then takes turn to draw a line starting from one circle to another. Turn by turn as you draw edges from one circle to another you will finally enclose a square. When a player draws the last edge of the square they score a point. Such square must be formed with unit edges or adjacent circles. When you score a point, your initials or symbols are inscribed inside the square for later count. One all of the edges are finished, scores for each player are counted based on count of their symbols or how many squares they managed to enclose. I am Deshant Devkota, a Computer Science and Information Technology student and I thought it would be pretty fun to develop Golos into a multiplayer online game. I know html, css, js, bootsrap and php(CodeIgniter), so I have decided to use this skills to develop the game. I have decided to open source the project so that interested programmers might join in. The project will be started and improved incrementally. -2022/06/08 Wednesday.
