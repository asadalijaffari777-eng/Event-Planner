import Cards from "../components/Cards";
import { CARDS } from "../data";
import React from "react";

export default function About({ id }) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0b0b0b] transition-colors px-4 py-24"
    >
      <h2 className="text-3xl font-semibold text-[#111827] dark:text-[#f3f4f6]">
        Plan your Event here
      </h2>
      <p className="mt-4 max-w-2xl text-center text-gray-700 dark:text-gray-300">
        Choose your ceremony hall
      </p>

      <div id="cards" className="mt-8 w-full max-w-6xl">
        <ul className="flex flex-wrap -m-4">
          {CARDS.map((cardItem, index) => (
            <Cards key={index} {...cardItem} />
          ))}
        </ul>
      </div>
    </section>
  );
}
