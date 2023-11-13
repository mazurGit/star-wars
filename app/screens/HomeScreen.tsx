import React from "react";
import { View } from "react-native";

import { Screen, Text } from "~app/components";

export const HomeScreen = () => {
  return (
    <Screen statusBarProps={{ hidden: true }}>
      <View>
        <Text> Just an empty home screen </Text>
      </View>
    </Screen>
  );
};
