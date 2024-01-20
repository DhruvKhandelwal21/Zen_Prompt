import React from "react";
import Feed from "@components/feed";
const Home = () => {
  return (
    <section className="w-full flex flex-col">
      <h1 className="head_text text-center">Discover & Share</h1>
      <br className="md:hidden" />
      <span className="orange_gradient text-4xl text-center">AI powered prompts</span>
      <p className="text-center mt-3">
        Promptopia is an open source AI prompting tool for modern world to
        discover, create and share prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
