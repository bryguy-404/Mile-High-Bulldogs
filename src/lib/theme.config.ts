export const theme = {
  colors: {
    primary: "#BA0C2F",
    secondary: "#65051A",
    accent: "#FFD043",
    background: "#F7F5EF",
    foreground: "#111111",
    muted: "#6D6C6A",
  },
  fonts: {
    heading: "'Barlow Condensed', sans-serif",
    body: "Inter, sans-serif",
  },
  radius: {
    sm: "0px",
    md: "0px",
    lg: "0px",
  },
} as const;

export type Theme = typeof theme;
