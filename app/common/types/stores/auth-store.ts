import { Instance, SnapshotOut } from "mobx-state-tree";

import { AuthStoreModel } from "~app/models";

export interface IAutStore extends Instance<typeof AuthStoreModel> {}
export interface IAuthStoreSnapshot
  extends SnapshotOut<typeof AuthStoreModel> {}
