import { FlexStyle } from "react-native";

import { spacing } from "~app/theme";

export type TSpacing = keyof typeof spacing;

export type TGeneratedStyles<
  T extends Record<string, number>,
  J extends TIndentType,
> = {
  [TKey in TSpacing as `${J}${T[TKey]}`]: FlexStyle;
};

export type TIndentType =
  | "m"
  | "mt"
  | "mb"
  | "mr"
  | "ml"
  | "mv"
  | "mh"
  | "pt"
  | "pb"
  | "pr"
  | "pl"
  | "p"
  | "pv"
  | "ph";

export type TIndentStyle = keyof Pick<
  FlexStyle,
  | "marginBottom"
  | "margin"
  | "marginLeft"
  | "marginTop"
  | "marginHorizontal"
  | "marginRight"
  | "marginVertical"
  | "padding"
  | "paddingBottom"
  | "paddingHorizontal"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingVertical"
>;
