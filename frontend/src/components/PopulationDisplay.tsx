import React from "react";

const formatPopulation = (population: number) => {
  if (population >= 1_000_000_000) {
    return (population / 1_000_000_000).toFixed(1) + "B 🌎"; // Billion
  }
  if (population >= 1_000_000) {
    return (
      (population / 1_000_000).toFixed(1) + "M 🌍" // Million
    );
  }
  if (population >= 1_000) {
    return (
      new Intl.NumberFormat().format(population) + " 👥" // Thousand
    );
  }
  return population.toString();
};

const PopulationDisplay = ({
  population,
}: {
  population: number;
}): React.ReactElement => {
  return <p>{formatPopulation(population)}</p>;
};

export default PopulationDisplay;
