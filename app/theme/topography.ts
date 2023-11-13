const fonts = {
  raleway: {
    // Cross-platform font.
    light: "Raleway-Light",
    normal: "Raleway-Regular",
    medium: "Raleway-Medium",
    semiBold: "Raleway-SemiBold",
    bold: "Raleway-Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
};

export const typography = {
  fonts,
  primary: fonts.raleway,
};
