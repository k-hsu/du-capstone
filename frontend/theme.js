export const spacing = {
  0.25: "4px",
  0.5: "8px",
  0.75: "12px",
  1: "16px",
  1.25: "20px",
  1.5: "24px",
  1.75: "28px",
  2: "32px",
  2.25: "36px",
  2.5: "40px",
  3: "48px",
  3.5: "56px",
  4: "64px",
  4.5: "72px",
  5: "80px",
};

export const fontWeight = {
  normal: "400",
  bold: "700",
};

export const color = {
  white: "#FFF",
  black: "#000",
  black60: "rgba(0, 0, 0, 0.60)",
  red: "#F00",
};

const breakpoints = [576, 780];

export const mediaQuery = breakpoints.map(
  (breakpoint) => `@media (max-width: ${breakpoint}px)`
);

export const typography = {
  h1: {
    fontWeight: fontWeight.bold,
    fontSize: spacing["1.75"],
  },
  h2: {
    fontWeight: fontWeight.bold,
    fontSize: spacing["1.5"],
  },
  h3: {
    fontWeight: fontWeight.bold,
    fontSize: spacing["1.25"],
  },
  p: {
    fontWeight: fontWeight.normal,
    fontSize: spacing["1"],
  },
  a: {
    fontWeight: fontWeight.normal,
    fontSize: spacing["1"],
  },
};

export const globalStyles = `
  #__next,
  #__next > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
