function randomizer() {
  return Math.random() - 0.5;
}

export function shuffler(string) {
  return string.split('').sort(randomizer);
}
