import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import { colors, typography } from "~app/theme";

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof $presets;

export type TextProps = {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
};

export function Text(props: TextProps & RNTextProps) {
  const {
    weight,
    size,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const content = text || children;

  const preset: Presets = props?.preset || "default";
  const $styles = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ];
  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 },
  xl: { fontSize: 24, lineHeight: 34 },
  lg: { fontSize: 20, lineHeight: 32 },
  md: { fontSize: 18, lineHeight: 26 },
  sm: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 14, lineHeight: 21 },
  xxs: { fontSize: 12, lineHeight: 18 },
} as const;

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {},
) as Record<Weights, TextStyle>;
const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
];

const $presets = {
  default: $baseStyle,

  bold: [
    $baseStyle,
    $fontWeightStyles.bold,
    $sizeStyles.xl,
  ] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    $sizeStyles.xxl,
    $fontWeightStyles.bold,
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.medium,
  ] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,
};
