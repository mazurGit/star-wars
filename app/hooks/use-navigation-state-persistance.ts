import { NavigationState } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";

import { EStorageKey } from "~app/common/enums";
import { getActiveRouteName } from "~app/helpers/navigation";
import { storage } from "~app/services";

export const useNavigationStatePersistance = (
  {
    shouldPersistState = true,
    onRouteChangeAction,
  }: {
    shouldPersistState: boolean;
    onRouteChangeAction?: () => void;
  } = { shouldPersistState: true },
) => {
  const [initialState, setInitialState] = useState<
    NavigationState | undefined
  >();
  const [isStateRestored, setIsStateRestored] = useState(false);
  const prevRouteName = useRef<string | null>(null);

  const restoreState = () => {
    const state = storage.load(EStorageKey.NAVIGATION_PERSIST, "object");
    state && setInitialState(state as NavigationState);
    setIsStateRestored(true);
  };

  useEffect(() => {
    shouldPersistState && restoreState();
  }, []);

  const onStateChange = (state: NavigationState | undefined) => {
    const activeRouteName = getActiveRouteName(state);
    if (activeRouteName !== prevRouteName.current) {
      onRouteChangeAction && onRouteChangeAction();
    }
    storage.save(EStorageKey.NAVIGATION_PERSIST, state);
    prevRouteName.current = activeRouteName;
  };
  return { onStateChange, isStateRestored, initialState };
};
