import { types } from "mobx-state-tree";

import {
  withExtraArguments,
  withRootStore,
  withSetPropAction,
} from "~app/helpers";

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
  })
  .views(withExtraArguments)
  .views(withRootStore<"authStore">())
  .views(withSetPropAction)
  .views(store => ({
    get isAuthenticated() {
      return !!store.authToken;
    },
  }))
  .actions(store => ({
    logout() {
      const {
        setProp,
        extra: { appLifeCycle },
      } = store;
      setProp("authEmail", "");
      setProp("authToken", undefined);
      appLifeCycle.onUserSignOut();
    },
  }));
