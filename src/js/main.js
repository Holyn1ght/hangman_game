import "../css/style.css";
import { darkModeToggle } from "./utils";
import { startGame } from "./game";

darkModeToggle();

document.getElementById("startGame").onclick = startGame;
