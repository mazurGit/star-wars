import { Instance, SnapshotOut } from "mobx-state-tree";

import { ModalsStoreModel } from "~app/models";

export interface IModalStore extends Instance<typeof ModalsStoreModel> {}
export interface IModalStoreSnapshot
  extends SnapshotOut<typeof ModalsStoreModel> {}
