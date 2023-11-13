import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";

import { HomeScreen } from "../screens";
import { ERootStack, TRootNavigatorParamList } from "~app/common/navigation";

const RootStack = createNativeStackNavigator<TRootNavigatorParamList>();

export const RootNavigator = observer(() => {
  return (
    <RootStack.Navigator initialRouteName={ERootStack.HOME_SCREEN}>
      <RootStack.Screen name={ERootStack.HOME_SCREEN} component={HomeScreen} />
    </RootStack.Navigator>
  );
});
