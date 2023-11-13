import { IStateTreeNode, SnapshotIn, getRoot, getEnv } from "mobx-state-tree";

import { TExtraArguments } from "~app/common/types/app/extra-arguments";
import { IRootStore } from "~app/common/types/stores/root-store";
export const withSetPropAction = <T extends IStateTreeNode>(
  mstInstance: T,
) => ({
  setProp<K extends keyof SnapshotIn<T>, V extends SnapshotIn<T>[K]>(
    field: K,
    newValue: V,
  ) {
    // @ts-ignore - for some reason TS complains about this, but it still works fine
    mstInstance[field] = newValue;
  },
});

export const withRootStore =
  <K extends keyof IRootStore>() =>
  <T extends IStateTreeNode>(mstInstance: T) => ({
    get rootStore() {
      return getRoot<Omit<IRootStore, K>>(mstInstance);
    },
  });

export const withExtraArguments = <T extends IStateTreeNode>(
  mstInstance: T,
) => ({
  get extra() {
    return getEnv<TExtraArguments>(mstInstance);
  },
});
