import { generateSpacingStyle } from "~app/helpers";

export const PADDING = {
  ...generateSpacingStyle("pb", "paddingBottom"),
  ...generateSpacingStyle("pt", "paddingTop"),
  ...generateSpacingStyle("pr", "paddingRight"),
  ...generateSpacingStyle("pl", "paddingLeft"),
  ...generateSpacingStyle("pv", "paddingVertical"),
  ...generateSpacingStyle("ph", "paddingHorizontal"),
  ...generateSpacingStyle("p", "padding"),
};
