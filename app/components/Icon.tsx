import React from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import { iconRegistry } from "~app/theme";
import { IconTypes } from "~app/common/types";

const Wrapper: React.ElementType<TouchableOpacityProps> = props =>
  "onPress" in props ? (
    <TouchableOpacity {...props} />
  ) : (
    <View {...(props as ViewProps)} />
  );

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...wrapperProps
  } = props;

  const isPressable = !!wrapperProps.onPress;

  const imageStyles: StyleProp<ImageStyle> = [
    $imageStyle,
    !!color && { tintColor: color },
    !!size && { width: size, height: size },
    $imageStyleOverride,
  ].filter(Boolean);
  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...wrapperProps}
      style={$containerStyleOverride}>
      <Image style={imageStyles} source={iconRegistry[icon]} />
    </Wrapper>
  );
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
};
