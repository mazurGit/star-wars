import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum ERootStack {
  HOME_SCREEN = "Home Screen",
}

export type TRootNavigatorParamList = {
  [ERootStack.HOME_SCREEN]: undefined;
};

export type TRootNavigationProps =
  NativeStackNavigationProp<TRootNavigatorParamList>;
