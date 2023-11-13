import { IDisposer, applySnapshot, onSnapshot } from "mobx-state-tree";
import { useEffect, useState } from "react";

import { EStorageKey } from "~app/common/enums";
import { RootStoreTree } from "~app/common/types/";
import { useStores } from "~app/hooks";
import { appLifeCycle, reactotron, storage } from "~app/services";

export const useRestoreState = ({
  appStartActions,
  unsubscribeActions,
}: {
  appStartActions?: { (...args: any): void }[];
  unsubscribeActions?: { (): void }[];
} = {}) => {
  const rootStore: RootStoreTree = useStores();

  const [isStoreRestored, setIsStoreRestored] = useState(false);

  useEffect(() => {
    let _disposer: IDisposer | undefined;
    try {
      const rootStoreLastSnapshot = storage.load<RootStoreTree, "object">(
        EStorageKey.ROOT_STATE_STORAGE_KEY,
        "object",
      );
      rootStoreLastSnapshot && applySnapshot(rootStore, rootStoreLastSnapshot);
      reactotron.setReactotronRootStore(rootStore, rootStoreLastSnapshot);
      appLifeCycle.setRootStore(rootStore);
    } catch (e) {
      console.error(e);
      reactotron.logError(e);
    }

    setIsStoreRestored(true);
    _disposer && _disposer();

    _disposer = onSnapshot(rootStore, snapshot =>
      storage.save(EStorageKey.ROOT_STATE_STORAGE_KEY, snapshot),
    );

    const unsubscribe = () => {
      _disposer && _disposer();
      _disposer = undefined;
    };

    appStartActions?.forEach(action => action());
    return () => {
      unsubscribe && unsubscribe();
      unsubscribeActions?.forEach(action => action());
    };
  }, []);
  return { isStoreRestored };
};
