import { types } from "mobx-state-tree";

import { IModal, ModalScreenModel } from "./subModals";
import {
  withExtraArguments,
  withRootStore,
  withSetPropAction,
} from "~app/helpers";
import { EModalName } from "~app/common/enums";

export const ModalsStoreModel = types
  .model("ModalsStore")
  .props({
    modals: types.array(ModalScreenModel),
  })
  .actions(withSetPropAction)
  .views(withExtraArguments)
  .views(withRootStore<"modalStore">())
  .views(store => ({
    getModalPropsByName(modalName: EModalName) {
      return store.modals.find(modal => modal.name === modalName);
    },
  }))

  .actions(store => ({
    registerModal(modalName: EModalName) {
      store.setProp("modals", [
        ...store.modals,
        { name: modalName, visible: false },
      ]);
    },

    toggleModal({ name, visible }: { name: EModalName; visible?: boolean }) {
      const modal = store.modals.find(modal => modal.name === name);
      const visibilityStatus =
        typeof visible === "undefined" ? !modal?.visible : visible;
      modal!.visible = visibilityStatus;
    },

    closeAllModals() {
      store.modals.forEach(({ name }) => {
        this.toggleModal({ name, visible: false });
      });
    },

    updateModalProps(modalName: EModalName, props: Omit<IModal, "name">) {
      if (!modalName) {
        return;
      }
      const index = store.modals.findIndex(modal => modal.name === modalName);
      store.modals[index] = { ...store.modals[index], ...props };
    },
  }));
