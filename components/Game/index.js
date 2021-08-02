import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

const GameWrapper = styled.section(
  ({}) => css`
    display: flex;
    text-align: center;
    flex-direction: column;
    position: relative;
    width: 30rem;
    height: 30rem;
  `
);

const Title = styled.section(
  ({}) => css`
    display: flex;
    text-align: center;
    font-size: 4rem;
  `
);

const GameMenu = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: ${theme.colors.veryLightGrey};
    border-radius: 10px;
    padding: 1.5rem;
  `
);

const GameBoard = styled.div(
  () => css`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  `
);

const GameButton = styled.button(
  ({ theme }) => css`
    border: 1px solid ${theme.colors.white};
    font-size: 4rem;
    line-height: 0;
  `
);

const WinnerMessage = styled.div(
  ({ theme, isWinner }) => css`
    margin-top: 0.5rem;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: ${theme.colors.white};
    text-align: center;
    background-color: ${isWinner && `#008000c4`};
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
  const [isDraw, setIsDraw] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

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
      return ticTacToe[indexRow][indexCell][0] > 0 ? "O" : "X";
    }
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

    possibleWaysToWin.map((row) => {
      if (row.every((cell) => cell[0] === 1)) {
        console.log("winner o");
        setIsWinner("O");
        setShowMessage(true);
      }
      if (row.every((cell) => cell[0] === -1)) {
        setIsWinner("X");
        setShowMessage(true);
      }
    });
  });

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

  // Show message
  useEffect(() => {
    if (!isWinner) return;

    const messageTimeout = setTimeout(() => {
      setTicTacToe(initialPositions);
      setIsWinner("");
      setIsDraw(false);
      setShowMessage(false);
    }, 3000);

    return () => {
      clearTimeout(messageTimeout);
    };
  }, [isWinner, initialPositions]);

  return (
    <GameWrapper>
      <Title>Tic Tac Toe Game</Title>
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
      <WinnerMessage isWinner={showMessage}>
        {showMessage && <>Congratulations you won the match</>}
      </WinnerMessage>
    </GameWrapper>
  );
}
