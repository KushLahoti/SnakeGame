import React, { useEffect } from "react";
import { initiateGame } from "../gameLogic";
function Game() {
    useEffect(() => {
        initiateGame();
    }, []);
    return (
        <div className="game-area">
            <div id="score-board">Score:10</div>
            <div id="board"></div>
        </div>
    );
}

export default Game;
