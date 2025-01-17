export const colorTokens = {
    drops: {
      100: "#f0f0f0",
      150: "#d4d4d4",
      200: "#b8b8b8",
      300: "#9c9c9c",
      400: "#7f7f7f",
      500: "#636363",
      600: "#474747",
      700: "#2b2b2b",
      800: "#0f0f0f",
      850:"#262626",
      900: "#0d0d0d",
      1000: "#000000"
    },
  };
  
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              text: {
                main: colorTokens.drops[300],
                mid: colorTokens.drops[200],
                low: colorTokens.drops[100],
                high: colorTokens.drops[900],
                title: colorTokens.drops[200]
              },
              background: {
                high: colorTokens.drops[900],
                mid: colorTokens.drops[300],
                low: colorTokens.drops[150],
              },
              shadow: {
                main: "rgba(255, 255, 255, 0.35)",
                sub: "rgba(255, 255, 255, 0.25)",
              },
              error: {
                main: "#FF5733",
              },
              placeholder: {
                main: "#999999",
              },
              tag: {
                bg: colorTokens.drops[200],
                text: colorTokens.drops[600],
              }
            }
          : {
              // palette values for light mode
              text: {
                main: colorTokens.drops[700],
                mid: colorTokens.drops[500],
                low: colorTokens.drops[400],
                high: colorTokens.drops[150],
                title: colorTokens.drops[100],
              },
              background: {
                high: colorTokens.drops[100],
                mid: colorTokens.drops[900],
                low: colorTokens.drops[700],
              },
              shadow: {
                main: "rgba(0, 0, 0, 0.35)",
                sub: "rgba(0, 0, 0, 0.25)",
              },
              error: {
                main: "#FF5733",
              },
              placeholder: {
                main: "#666666",
              },
              tag:{
                bg: colorTokens.drops[150],
                text: colorTokens.drops[600],
              }
            }),
      },
    };
  };
  