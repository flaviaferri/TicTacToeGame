import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

const GameWrapper = styled.section(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2rem;
    min-height: 100vh;
  `
);

const Title = styled.h1(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    font-size: 4rem;
    color: ${theme.colors.white};
    border-bottom: 3px dotted ${theme.colors.beige};
    padding-bottom: 1rem;
    text-transform: uppercase;

    ${theme.breakpoints[0]} {
      width: 100%;
      font-size: 3rem;
    }
  `
);

// scoreboard style
const PlayerBoard = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.colors.darkGreen};
    padding: 2rem;

    ${theme.breakpoints[0]} {
      width: 100%;
    }
  `
);
const Scoreboard = styled.div(
  ({ theme }) => css`
    font-size: 5rem;
    color: ${theme.colors.white};
    margin: 0 1rem;

    ${theme.breakpoints[0]} {
      font-size: 4rem;
    }
  `
);

const PlayerPoint = styled.span(
  ({ theme, player }) => css`
    opacity: ${player && "0"};
    width: 1rem;
    height: 1rem;
    background: ${theme.colors.yellow};
    border-radius: 50%;
    margin: 1rem;
  `
);

// playboard Style
const GameBoard = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    overflow: hidden;
    width: 51rem;
    height: 51rem;

    ${theme.breakpoints[0]} {
      width: 30rem;
      height: 30rem;
    }
  `
);

const GameButton = styled.button(
  ({ theme }) => css`
    font-size: 8rem;
    font-weight: 500;

    background: transparent;
    outline: 2px solid ${theme.colors.beige};
    border: none;
    cursor: pointer;
    text-align: center;

    &:last-child {
      grid-area: 3/3;
    }
  `
);

//players style
const PlayerO = styled.p(
  ({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.darkGreen};
    text-align: center;

    ${theme.breakpoints[0]} {
      font-size: 7rem;
    }
  `
);

const PlayerX = styled.p(
  ({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.white};
    text-align: center;

    ${theme.breakpoints[0]} {
      font-size: 7rem;
    }
  `
);

// New Game and reset buttons style
const ButtonWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    padding: 2rem;
    width: 70%;
    justify-content: space-evenly;

    ${theme.breakpoints[0]} {
      width: 100%;
      padding: 4rem 2rem;
    }
  `
);

const Button = styled.button(
  ({ theme }) => css`
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 1.8rem;
    background: transparent;
    color: ${theme.colors.white};
  `
);

const MessageWrapper = styled.div(
  () => css`
    position: absolute;
  `
);

const Message = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: ${theme.colors.darkGreen};
    background-color: ${theme.colors.white};
    height: 5rem;
    width: 50rem;
    border-radius: 1.5rem;

    ${theme.breakpoints[0]} {
      width: 20rem;
    }
  `
);

const Winner = styled.p(
  () => css`
    font-size: 2rem;
    font-weight: 700;
    margin-right: 0.5rem;
  `
);

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
  const getplayerIcon = (indexRow, indexCell) => {
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
      <GameBoard>
        {ticTacToe.map((row, indexRow) =>
          row.map((_, indexCell) => (
            <GameButton
              key={indexCell}
              type="button"
              onClick={() => handelClick(indexRow, indexCell)}
            >
              {getplayerIcon(indexRow, indexCell)}
            </GameButton>
          ))
        )}
      </GameBoard>
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
