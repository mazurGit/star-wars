import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header, HeaderProps } from "~app/components";

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.
 *
 */
export function useHeader(headerProps: HeaderProps, deps: any[] = []) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    });
  }, deps);
}
