const breakpoints = [576, 768];

export const theme = {
  colors: {
    veryLightGrey: "#f9f9f9",
    lightGreen: "#609ea1",
    darkGreen: "#0a6470",
    beige: "#deb987",
    white: "#fff",
    black: "#000",
  },

  breakpoints: breakpoints.map((bp) => `@media (min-width: ${bp}px)`),
};
