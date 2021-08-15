import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const GameWrapper = styled.section(
  ({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2rem;
    min-height: 100vh;
    max-width: 680px;
    margin: auto;

    ${theme.breakpoints[0]} {
      width: 90%;
    }
  `
);

export const Title = styled.h1(
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
export const PlayerBoard = styled.div(
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
export const Scoreboard = styled.div(
  ({ theme }) => css`
    font-size: 5rem;
    color: ${theme.colors.white};
    margin: 0 1rem;

    ${theme.breakpoints[0]} {
      font-size: 4rem;
    }
  `
);

export const PlayerPoint = styled.span(
  ({ theme, player }) => css`
    opacity: ${player && "0"};
    width: 1rem;
    height: 1rem;
    background: ${theme.colors.yellow};
    border-radius: 50%;
    margin: 1rem;
  `
);


//players style
export const PlayerO = styled.p(
  ({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.darkGreen};
    text-align: center;

    ${theme.breakpoints[0]} {
      font-size: 7rem;
    }
  `
);

export const PlayerX = styled.p(
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
export const ButtonWrapper = styled.div(
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

export const Button = styled.button(
  ({ theme }) => css`
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 1.8rem;
    background: transparent;
    color: ${theme.colors.white};
  `
);

export const MessageWrapper = styled.div(
  () => css`
    position: absolute;
  `
);

export const Message = styled.div(
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

export const Winner = styled.p(
  () => css`
    font-size: 2rem;
    font-weight: 700;
    margin-right: 0.5rem;
  `
);

export const Board = styled.div(
  ({theme}) => css`
    display: grid;
    width: 600px;
    height: 600px;
    overflow: hidden;

	  grid-template: repeat(3, 1fr) / repeat(3, 1fr);

    ${theme.breakpoints[0]} {
      width: 300px;
      height: 300px;
    }
  `
)


export const GameButton = styled.div(
  ({ theme }) => css`
    font-size: 8rem;
    font-weight: 500;
    min-height: 100px;


    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    box-shadow: 0 0 0 2px ${theme.colors.beige};

    cursor: pointer;
    text-align: center;
  `
);
