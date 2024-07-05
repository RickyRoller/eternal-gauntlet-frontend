"use client";

import styles from "./page.module.css";
import { ReactQueryProvider } from "./_components/reactQueryProvider";
import init from "../../public/eternal-gauntlet";
import { Home } from "./_components/home";

init().then(() => {
  console.log("loaded wasm-bindgen");
});

export default function Page() {
  return (
    <ReactQueryProvider>
      <main className={styles.main}>
        <Home />
      </main>
    </ReactQueryProvider>
  );
}
