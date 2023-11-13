import { Instance, types } from "mobx-state-tree";

import { EModalName } from "~app/common/enums";

export const ModalScreenModel = types.model("ModalScreen", {
  name: types.enumeration([...Object.values(EModalName)]),
  visible: types.maybe(types.boolean),
  title: types.maybe(types.string),
  description: types.maybe(types.string),
});

export interface IModal extends Instance<typeof ModalScreenModel> {}
