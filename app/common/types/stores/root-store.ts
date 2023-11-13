import { Instance, SnapshotOut } from "mobx-state-tree";

import { RootStoreModel } from "~app/models";
import { IAutStore } from "./auth-store";
import { IModalStore } from "./modal-store";

export interface IRootStore {
  authStore: IAutStore;
  modalStore: IModalStore;
}

export interface IRootStoreSnapshot
  extends SnapshotOut<typeof RootStoreModel> {}

export interface RootStoreTree extends Instance<typeof RootStoreModel> {}
