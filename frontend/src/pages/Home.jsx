import React from "react";
import Homepic from "../assets/home-pic.jpg"; // make sure the extension is correct

export default function Home({ id }) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-24"
      style={{ backgroundImage: `url(${Homepic})` }}
    >
      <h1 className="text-4xl font-bold drop-shadow-lg">
        Your Event starts here
      </h1>

      <p className="mt-4 max-w-2xl text-center text-gray-900 font-bold drop-shadow-lg">
        Plan smarter with AI. In order to use AI you should Sign in!
      </p>
    </section>
  );
}
