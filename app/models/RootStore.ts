import { types } from "mobx-state-tree";
import { createContext } from "react";

import { AuthStoreModel } from "./AuthStore";
import { IRootStore } from "~app/common/types/stores/root-store";
import { appLifeCycle, storage } from "~app/services";
import { ModalsStoreModel } from "./ModalsStore";

export const extraArguments = {
  storage,
  appLifeCycle,
};
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  modalStore: types.optional(ModalsStoreModel, {}),
});
export const rootStore = RootStoreModel.create({}, extraArguments);
export const Context = createContext<IRootStore>(rootStore);
