import { HEROES, Heroes } from "../types/heroes";

export const getRandomHero = (userHeroes: Heroes[]): Heroes => {
  const remainingHeroes = HEROES.filter((hero) => !userHeroes.includes(hero));
  if (remainingHeroes.length === 0) {
    return HEROES[Math.floor(Math.random() * HEROES.length)];
  }
  return remainingHeroes[Math.floor(Math.random() * remainingHeroes.length)];
};
