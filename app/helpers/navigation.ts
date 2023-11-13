import {
  PartialState,
  NavigationState,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();
/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 */
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...([name, params] as never));
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = { index: 0, routes: [] }) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state?: NavigationState | PartialState<NavigationState>,
) {
  if (!state) {
    return null;
  }
  const route = state.routes[state.index!];

  // Found the active route -- return the name
  if (!route.state) return route.name;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}
