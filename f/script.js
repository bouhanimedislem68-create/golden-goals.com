alert("Welcome to our website! this is a small tutorial to play :      Click on 'Random Player' and choose the multiplier .Don't forget that we gave you 3 skips and every duplicated player will give you a bonus try in order to achive 100k goals and get your own Golden Goal! Have Fun")
const players = {
  "Cristiano Ronaldo": 943, "Lionel Messi": 879, "Robert Lewandowski": 608, "Neymar Jr": 450,
  "Kylian Mbappé": 300, "Erling Haaland": 200, "Mohamed Salah": 350, "Kevin De Bruyne": 170,
  "Harry Kane": 350, "Vinícius Júnior": 60, "Luka Modrić": 100, "Son Heung-min": 210,
  "Jude Bellingham": 40, "Pedri": 25, "Sadio Mané": 250, "Zlatan Ibrahimović": 573,
  "Luis Suárez": 500, "Edinson Cavani": 430, "Karim Benzema": 445, "Romelu Lukaku": 300,
  "Antoine Griezmann": 250, "Pierre-Emerick Aubameyang": 300, "Ciro Immobile": 250,
  "Raheem Sterling": 150, "Marco Reus": 160, "Thomas Müller": 250, "Gareth Bale": 200,
  "Wayne Rooney": 366, "David Villa": 380, "Fernando Torres": 300, "Didier Drogba": 300,
  "Samuel Eto'o": 426, "Andriy Shevchenko": 400, "Thierry Henry": 411, "Alan Shearer": 409,
  "Michael Owen": 300, "Roberto Baggio": 318, "Gabriel Batistuta": 350, "Rivaldo": 350,
  "Ronaldinho": 300, "Pelé": 767, "Diego Maradona": 300, "Gerd Müller": 735,
  "Ferenc Puskás": 746, "Josef Bican": 805, "George Weah": 200, "Carlos Tevez": 300,
  "Hugo Sánchez": 500, "Raúl": 404, "Francesco Totti": 307, "Alessandro Del Piero": 346,
  "Filippo Inzaghi": 313, "Miroslav Klose": 300, "Henrik Larsson": 400, "Robin van Persie": 300,
  "Dimitar Berbatov": 280, "Edgar Davids": 100, "Xavi": 100, "Andrés Iniesta": 100,
  "Frank Lampard": 300, "Steven Gerrard": 200, "Paul Scholes": 150, "Dennis Bergkamp": 250,
  "Ryan Giggs": 170, "Jari Litmanen": 200
};

let currentPlayer = "";
let totalGoals = 0;
let skipsLeft = 3;
let playersDrawn = 0;
const goalTarget = 100000;
const maxSkips = 3;
const maxPlayers = 10;
const seenPlayers = new Set();

// DOM elements
const getPlayerBtn = document.getElementById("getPlayerBtn");
const skipBtn = document.getElementById("skipBtn");
const playerDisplay = document.getElementById("playerDisplay");
const playerList = document.getElementById("playerList");
const goalCounter = document.createElement("h3");
goalCounter.textContent = `Goals: ${totalGoals}`;
document.body.insertBefore(goalCounter, playerList);

const skipCounter = document.createElement("p");
skipCounter.textContent = `Skips left: ${skipsLeft}`;
document.body.insertBefore(skipCounter, playerList);

const drawCounter = document.createElement("p");
drawCounter.textContent = `Players drawn: ${playersDrawn}/${maxPlayers}`;
document.body.insertBefore(drawCounter, playerList);

// Draw a random player
function getRandomPlayer() {
  if (currentPlayer) {
    alert("Use or skip the current player first!");
    return;
  }
  if (playersDrawn >= maxPlayers) {
    alert("You've reached the 10-player limit!");
    getPlayerBtn.disabled = true;
    getPlayerBtn.style.opacity = 70;
    return;
  }

  const names = Object.keys(players);
  const randomName = names[Math.floor(Math.random() * names.length)];
  currentPlayer = randomName;

  if (seenPlayers.has(currentPlayer) && skipsLeft < maxSkips) {
    skipsLeft++;
    skipBtn.disabled = false;
  }

  seenPlayers.add(currentPlayer);
  playersDrawn++;
  playerDisplay.textContent = `${currentPlayer} (${players[currentPlayer]} goals)`;
  drawCounter.textContent = `Players drawn: ${playersDrawn}/${maxPlayers}`;
  skipCounter.textContent = `Skips left: ${skipsLeft}`;
}

// Handle "Get Player"
getPlayerBtn.addEventListener("click", getRandomPlayer);

// Handle "Skip"
skipBtn.addEventListener("click", () => {
  if (!currentPlayer) return alert("No player to skip!");
  if (skipsLeft <= 0) return alert("No skips left!");
  skipsLeft--;
  playersDrawn--;
  currentPlayer = "";
  playerDisplay.textContent = "";
  skipCounter.textContent = `Skips left: ${skipsLeft}`;
  if (skipsLeft === 0){
    skipBtn.style.backgroundColor = "lightslategray";
    skipBtn.disabled = true;
}
});

// Handle multipliers (each used once)
document.querySelectorAll("#multipliers button").forEach(button => {
  button.addEventListener("click", () => {
    if (!currentPlayer) return alert("Get a player first!");
    const multiplier = parseInt(button.getAttribute("data-multiplier"));
    const baseGoals = players[currentPlayer];
    const earnedGoals = baseGoals * multiplier;
    totalGoals += earnedGoals;

    goalCounter.textContent = `Goals: ${totalGoals.toLocaleString()}`;
    const listItem = document.createElement("li");
    listItem.textContent = `${currentPlayer} ×${multiplier} ➤ +${earnedGoals.toLocaleString()} goals`;
    playerList.appendChild(listItem);

    button.disabled = true;
    button.style.backgroundColor = "black";
    currentPlayer = "";
    playerDisplay.textContent = "";

    if (totalGoals >= goalTarget) {
      alert("🏆 You reached 100,000 goals! Victory!");
      getPlayerBtn.disabled = true;
      getPlayerBtn.style.backgroundColor = "gray";
      skipBtn.disabled = true;
      skipBtn.style.backgroundColor = "lightslategray";
    }
  });
});