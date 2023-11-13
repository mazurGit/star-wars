import { StyleSheet } from "react-native";

import { FLEX_BOX_STYLES } from "./flex-box";
import { MARGIN } from "./margin";
import { PADDING } from "./padding";

export const $globStyles = StyleSheet.create({
  ...FLEX_BOX_STYLES,
  ...MARGIN,
  ...PADDING,
});
