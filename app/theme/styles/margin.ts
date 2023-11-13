import { generateSpacingStyle } from "~app/helpers";

export const MARGIN = {
  ...generateSpacingStyle("mb", "marginBottom"),
  ...generateSpacingStyle("mt", "marginTop"),
  ...generateSpacingStyle("mr", "marginRight"),
  ...generateSpacingStyle("ml", "marginLeft"),
  ...generateSpacingStyle("mv", "marginVertical"),
  ...generateSpacingStyle("mh", "marginHorizontal"),
  ...generateSpacingStyle("m", "margin"),
};
