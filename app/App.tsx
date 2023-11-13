import React, { useCallback } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import BootSplash from "react-native-bootsplash";
import "./localization";

import { RootNavigator } from "./navigators";
import { useNavigationStatePersistance, useRestoreState } from "./hooks";
import { navigationRef } from "./helpers/navigation";
import { app, appLifeCycle } from "./services";
import { AppModalProvider } from "./components";

const App = () => {
  app.init();
  const { onAppFinished, onAppStarted, onAppNavigatorReady } = appLifeCycle;
  const { isStoreRestored } = useRestoreState({
    appStartActions: [onAppStarted],
    unsubscribeActions: [onAppFinished],
  });
  const { isStateRestored, onStateChange, initialState } =
    useNavigationStatePersistance();

  const onNavigationReady = useCallback(() => {
    [onAppNavigatorReady, () => BootSplash.hide({ fade: true })].forEach(func =>
      func(),
    );
  }, []);
  if (!isStateRestored && !isStoreRestored) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        onReady={onNavigationReady}
        ref={navigationRef}
        initialState={initialState}
        onStateChange={onStateChange}>
        <AppModalProvider />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
