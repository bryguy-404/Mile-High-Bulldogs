export const theme = {
  colors: {
    primary: "#C23541",
    secondary: "#343F6B",
    accent: "#FBCB30",
    background: "#F7F5EF",
    foreground: "#363435",
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
