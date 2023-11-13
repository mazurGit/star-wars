import { useContext } from "react";

import { IRootStore } from "~app/common/types/stores/root-store";
import { Context } from "~app/models";

export const useStores = () => useContext<IRootStore>(Context);
