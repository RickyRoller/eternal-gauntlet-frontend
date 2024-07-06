import { Home } from "./_components/home";

export default function Page() {
  return (
    <Home canvas={<canvas id="game-canvas" width="1200px" height="700px" />} />
  );
}
