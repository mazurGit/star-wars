import {
  TGeneratedStyles,
  TIndentStyle,
  TIndentType,
  TSpacing,
} from "~app/common/types/";
import { spacing } from "../theme/spacing";

export const generateSpacingStyle = <
  K extends TIndentStyle,
  J extends TIndentType,
>(
  styleShortName: J,
  styleName: K,
) => {
  const styles = {} as Record<any, any>;
  for (const key in spacing) {
    styles[
      `${styleShortName}${
        spacing[key as TSpacing]
      }` as `${TIndentType}${TSpacing}`
    ] = {
      [styleName]: spacing[key as TSpacing],
    };
  }
  return styles as TGeneratedStyles<typeof spacing, J>;
};
