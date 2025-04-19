import { useState, useEffect } from "react";

export const HeroText = ({ texts, index, fade }) => {
  return (
    <h1
      className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {texts[index]}
    </h1>
  );
};
