import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

import {
  GameWrapper,
  Title,
  PlayerBoard,
  Scoreboard,
  PlayerPoint,
  GameButton,
  PlayerO,
  PlayerX,
  ButtonWrapper,
  Button,
  MessageWrapper,
  Message,
  Winner,
  Board
} from './styles'

export default function Game() {
  const initialPositions = [
    [[null], [null], [null]],
    [[null], [null], [null]],
    [[null], [null], [null]],
  ];

  const [player, setPlayer] = useState(true);
  const [ticTacToe, setTicTacToe] = useState(initialPositions);
  const [isWinner, setIsWinner] = useState("");
  const [winnerMessage, setWinnerMessage] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [drawMessage, setDrawMessage] = useState(false);
  const [countOWinner, setCountOWinner] = useState(0);
  const [countXWinner, setCountXWinner] = useState(0);

  const possibleWaysToWin = [
    [ticTacToe[0][0], ticTacToe[0][1], ticTacToe[0][2]],
    [ticTacToe[1][0], ticTacToe[1][1], ticTacToe[1][2]],
    [ticTacToe[2][0], ticTacToe[2][1], ticTacToe[2][2]],

    [ticTacToe[0][0], ticTacToe[1][0], ticTacToe[2][0]],
    [ticTacToe[0][1], ticTacToe[1][1], ticTacToe[2][1]],
    [ticTacToe[0][2], ticTacToe[1][2], ticTacToe[2][2]],

    [ticTacToe[0][0], ticTacToe[1][1], ticTacToe[2][2]],
    [ticTacToe[0][2], ticTacToe[1][1], ticTacToe[2][0]],
  ];

  const handelClick = (indexRow, indexCell) => {
    if (isWinner) return;

    let newArray = ticTacToe;

    if (newArray[indexRow][indexCell][0] !== null) {
      return;
    }

    if (player) {
      newArray[indexRow][indexCell][0] = 1;
    } else {
      newArray[indexRow][indexCell][0] = -1;
    }

    setTicTacToe(newArray);
    setPlayer(!player);
  };

  // Responsible for changing the value (-1 || 1) by the icon ( O || X)
  const getPlayerIcon = (indexRow, indexCell) => {
    if (ticTacToe[indexRow][indexCell][0] !== null) {
      return ticTacToe[indexRow][indexCell][0] > 0 ? (
        <>
          <PlayerO isWinner={isWinner}>O</PlayerO>
        </>
      ) : (
        <>
          <PlayerX isWinner={isWinner}>X</PlayerX>
        </>
      );
    }
  };

  // New Game button
  const newGameButton = () => {
    return setTicTacToe(initialPositions); // back to initial position
  };

  // Reset Game Button
  const resetGameButton = () => {
    setTicTacToe(initialPositions); // back to initial positions
    setCountOWinner(0); //back to score 0
    setCountXWinner(0); // back to score 0
  };

  // Check winner
  useEffect(() => {
    possibleWaysToWin.map((row, index) => {
      if (row.every((cell) => cell[0] === 1)) {
        setIsWinner("O");
        setWinnerMessage(true);
        new Audio("/winner.mp3").play();

        return;
      }
      if (row.every((cell) => cell[0] === -1)) {
        setIsWinner("X");
        setWinnerMessage(true);
        new Audio("/winner.mp3").play();

        return;
      }
    });
  }, [ticTacToe, player]);

  // Draw checker
  useEffect(() => {
    const hasDraw = () => {
      const hasNull = ticTacToe.filter((itemRow) => {
        return itemRow.find((itemCell) => {
          return itemCell[0] === null;
        });
      });
      return hasNull.length === 0;
    };

    if (hasDraw()) {
      setIsDraw(true);
      setDrawMessage(true);

      new Audio("/draw.mp3").play();
    }
  });

  // Restart game Timeout and count scoreboard
  useEffect(() => {
    if (!isWinner && !isDraw) return;

    const messageTimeout = setTimeout(() => {
      setTicTacToe(initialPositions);
      setIsWinner("");
      setIsDraw(false);
      setDrawMessage(false);
      setWinnerMessage(false);

      if (isWinner === "O") {
        setCountOWinner(countOWinner + 1); // add point to O
      } else if (isWinner === "X") {
        setCountXWinner(countXWinner + 1); // add point to X
      }
      return;
    }, 5000);

    return () => {
      clearTimeout(messageTimeout);
    };
  }, [isWinner, initialPositions, isDraw]);

  return (
    <GameWrapper>
      <Title>Tic Tac Toe</Title>
      <PlayerBoard>
        <PlayerPoint player={!player}></PlayerPoint>O -
        <Scoreboard>
          {countOWinner} : {countXWinner}
        </Scoreboard>
        - X <PlayerPoint player={player}></PlayerPoint>
      </PlayerBoard>

      <Board>
        {ticTacToe.map((row, indexRow) =>
          row.map((_, indexCell) => (
            <GameButton
              key={indexCell}
              type="button"
              onClick={() => handelClick(indexRow, indexCell)}
            >
              {getPlayerIcon(indexRow, indexCell)}
            </GameButton>
          ))
        )}
      </Board>
      <ButtonWrapper>
        <Button onClick={() => newGameButton()}>New Game</Button>
        <Button onClick={() => resetGameButton()}>Reset Game</Button>
      </ButtonWrapper>
      <MessageWrapper drawMessage={drawMessage} winnerMessage={winnerMessage}>
        {drawMessage && <Message>Tied Game 😕</Message>}
        {winnerMessage && (
          <Message>
            {isWinner === "O" ? <Winner>O</Winner> : <Winner>X</Winner>}
            Won!! 🎉
          </Message>
        )}
      </MessageWrapper>
    </GameWrapper>
  );
}
