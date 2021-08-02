import Head from "next/head";
import Game from "../components/Game";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe Game</title>
        <meta name="description" content="Tic Tac Toe Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Game />
      </main>

      <footer></footer>
    </div>
  );
}
