import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Script from "next/script";
import { Theme } from "@radix-ui/themes";
import { ReactQueryProvider } from "./_components/reactQueryProvider";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eternal Guantlet",
  description: "Solana Speedrun 3 entry by Ricky Roller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark">
          <main className={styles.main}>{children}</main>

          <Script strategy="beforeInteractive" id="audio-script">
            {`
                // the following function keeps track of all AudioContexts and resumes them on the first user
                // interaction with the page. If the function is called and all contexts are already running,
                // it will remove itself from all event listeners.
                (function () {
                    // An array of all contexts to resume on the page
                    const audioContextList = [];

                    // An array of various user interaction events we should listen for
                    const userInputEventNames = [
                        "click",
                        "contextmenu",
                        "auxclick",
                        "dblclick",
                        "mousedown",
                        "mouseup",
                        "pointerup",
                        "touchend",
                        "keydown",
                        "keyup",
                    ];

                    // A proxy object to intercept AudioContexts and
                    // add them to the array for tracking and resuming later
                    self.AudioContext = new Proxy(self.AudioContext, {
                        construct(target, args) {
                            const result = new target(...args);
                            audioContextList.push(result);
                            return result;
                        },
                    });

                    // To resume all AudioContexts being tracked
                    function resumeAllContexts(_event) {
                        
                        let count = 0;

                        audioContextList.forEach((context) => {
                            if (context.state !== "running") {
                                context.resume();
                            } else {
                                count++;
                            }
                        });

                        // If all the AudioContexts have now resumed then we unbind all
                        // the event listeners from the page to prevent unnecessary resume attempts
                        // Checking count > 0 ensures that the user interaction happens AFTER the game started up
                        if (count > 0 && count === audioContextList.length) {
                            userInputEventNames.forEach((eventName) => {
                                document.removeEventListener(eventName, resumeAllContexts);
                            });
                        }
                    }

                    // We bind the resume function for each user interaction
                    // event on the page
                    userInputEventNames.forEach((eventName) => {
                        document.addEventListener(eventName, resumeAllContexts);
                    });
                })();
              `}
          </Script>
        </Theme>
      </body>
    </html>
  );
}
