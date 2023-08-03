import { WORDS, KEYBOARD } from "./consts.js";

const gameDiv = document.querySelector("#game");
const logo = document.querySelector(".logo");
let word;
let triesCount = 10;
let winCount = 0;

function getRandomWord() {
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  sessionStorage.setItem("word", randomWord);

  return randomWord;
}

function createWordPlaceholder() {
  const wordArray = Array.from(word).reduce(
    (acc, curr, i) => acc + `<span class="letter" id="letter_${i}">_</span>`,
    "",
  );

  return `<div class="placeholder-wrapper" id="wordPlaceholder">${wordArray}</div>`;
}
function createKeyboard() {
  const keyboardDiv = document.createElement("div");
  keyboardDiv.classList.add("keyboardDiv");
  keyboardDiv.id = "keyboard";
  const keyboard = KEYBOARD.reduce((acc, curr) => {
    return (
      acc +
      `<button class="btn-primary flex items-center justify-center w-8 h-8 md:w-12 md:h-12 m-0" id='${curr}'>${curr}</button>`
    );
  }, "");
  keyboardDiv.innerHTML = keyboard;

  return keyboardDiv;
}

function createGibbet() {
  const gibbetDiv = document.createElement("div");
  gibbetDiv.id = "gibbet";

  const gibbetImg = document.createElement("img");
  gibbetImg.src = "images/hg-0.png";
  gibbetImg.width = "300";
  gibbetImg.id = "gibbetImg";

  gibbetDiv.appendChild(gibbetImg);

  return gibbetDiv;
}

function stopGame(status) {
  document.getElementById("wordPlaceholder").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("endGame").remove();

  if (status === "lose") {
    gameDiv.innerHTML +=
      '<p class="text-xl mt-2 dark:text-white">You lost.</p>';
  } else if (status === "win") {
    document.getElementById("gibbetImg").src = "images/hg-win.png";
    gameDiv.innerHTML += '<p class="text-xl mt-2 dark:text-white">You won!</p>';
  } else if (status === "quite") {
    document.getElementById("gibbet").remove();
    // gameDiv.classList.add("mt-40");
  }
  gameDiv.innerHTML += `<p class="text-xl mt-2 dark:text-white">The word was: <span class="text-red-500" text-xl>${word}</span></p>`;

  gameDiv.innerHTML +=
    '<button class="btn-primary" id="playAgain">PLAY AGAIN</button>';

  document.getElementById("playAgain").onclick = startGame;

  console.log(status);
}

function checkLetter(letter) {
  const wordArray = Array.from(word.toUpperCase());
  document.getElementById(`${letter}`).disabled = true;

  if (!wordArray.includes(letter)) {
    const triesLeft = document.querySelector("#triesCounter");
    triesLeft.innerText -= 1;

    if (triesLeft.innerText === "0") {
      stopGame("lose");
    }

    const gibbetImg = document.querySelector("#gibbetImg");
    gibbetImg.src = `images/hg-${10 - triesLeft.innerText}.png`;
  } else {
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === letter) {
        document.getElementById(`letter_${i}`).innerText = currentLetter;
        winCount++;
        console.log(winCount);
      }
    });

    if (winCount === word.length) {
      stopGame("win");
    }
  }
}

export function startGame() {
  word = getRandomWord();
  triesCount = 10;
  winCount = 0;

  const keyboardDiv = createKeyboard();
  const gibbetDiv = createGibbet();

  gameDiv.innerHTML = createWordPlaceholder();
  gameDiv.innerHTML += `<p class="text-xl mt-2 dark:text-white" id="tries">TRIES LEFT: <span id="triesCounter" class="text-red-500">${triesCount}</span></p>`;

  gameDiv.appendChild(keyboardDiv);
  gameDiv.prepend(gibbetDiv);
  logo.classList.add("text-2xl", "md:text-3xl", "mt-10");

  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      checkLetter(event.target.id);
    }
  });

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button class="btn-primary m-0 mt-10" id="endGame">End game</button>',
  );

  document.getElementById("endGame").onclick = () => {
    stopGame("quite");
  };
}
