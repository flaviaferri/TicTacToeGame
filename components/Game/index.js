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
    margin-top: 2rem;
    height: 100vh;
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
      width: 90%;
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
      width: 80%;
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
  () => css`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    overflow: hidden;
  `
);

const GameButton = styled.button(
  ({ theme }) => css`
    font-size: 8rem;
    font-weight: 500;
    width: 15rem;
    height: 15rem;
    background: transparent;
    outline: 2px solid ${theme.colors.beige};
    border: none;
    cursor: pointer;

    &:last-child {
      grid-area: 3/3;
    }

    ${theme.breakpoints[0]} {
      width: 10rem;
      height: 10rem;
    }
  `
);

//players style
const PlayerO = styled.div(
  ({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.darkGreen};

    ${theme.breakpoints[0]} {
      font-size: 8rem;
    }
  `
);

const PlayerX = styled.div(
  ({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.white};

    ${theme.breakpoints[0]} {
      font-size: 8rem;
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

// const WinnerMessage = styled.div(
//   ({ theme, isWinner }) => css`
//     margin-top: 0.5rem;
//     min-height: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.8rem;
//     color: ${theme.colors.darkGreen};
//     text-align: center;
//     background-color: ${isWinner && `red`};
//     height: 5rem;
//     width: 50rem;
//     border-radius: 1.5rem;
//     position: absolute;
//   `
// );

export default function Game() {
  const initialPositions = [
    [[null], [null], [null]],
    [[null], [null], [null]],
    [[null], [null], [null]],
  ];

  const [player, setPlayer] = useState(true);
  const [ticTacToe, setTicTacToe] = useState(initialPositions);
  const [isWinner, setIsWinner] = useState("");
  const [lineWinner, setLineWinner] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  const [countOWinner, setCountOWinner] = useState(0);
  const [countXWinner, setCountXWinner] = useState(0);

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

  const getplayerIcon = (indexRow, indexCell) => {
    if (ticTacToe[indexRow][indexCell][0] !== null) {
      return ticTacToe[indexRow][indexCell][0] > 0 ? (
        <>
          <PlayerO lineWinner={lineWinner}>O</PlayerO>
        </>
      ) : (
        <>
          <PlayerX isWinner={isWinner}>X</PlayerX>
        </>
      );
    }
  };

  const newGameButton = () => {
    return setTicTacToe(initialPositions);
  };

  const resetGameButton = () => {
    setTicTacToe(initialPositions);
    setCountOWinner(0);
    setCountXWinner(0);
  };

  // Check winner
  useEffect(() => {
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

    possibleWaysToWin.map((row, index) => {
      if (row.every((cell) => cell[0] === 1)) {
        setIsWinner("O");
        // setShowMessage(true);
        setLineWinner(index);

        return;
      }
      if (row.every((cell) => cell[0] === -1)) {
        setIsWinner("X");
        // setShowMessage(true);
        setLineWinner(index);

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
    }
  });

  // Restart game Timeout
  useEffect(() => {
    if (!isWinner && !isDraw) return;

    const messageTimeout = setTimeout(() => {
      setTicTacToe(initialPositions);
      setIsWinner("");
      setIsDraw(false);

      if (isWinner === "O") {
        setCountOWinner(countOWinner + 1);
      } else if (isWinner === "X") {
        setCountXWinner(countXWinner + 1);
      }
      return;
    }, 3000);

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
    </GameWrapper>
  );
}
