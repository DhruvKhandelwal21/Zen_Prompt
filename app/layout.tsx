import React from "react";
import "@styles/globals.css";
import Nav from "../pages/nav";
import Provider from "@pages/provider";
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
