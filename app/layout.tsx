import React from "react";
import "@styles/globals.css";
import Nav from "../components/nav";
import Provider from "@components/provider";
export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI prompts",
};
const layout = ({ children }: any) => {
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
