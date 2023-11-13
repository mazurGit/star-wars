import { IReactotronConfig } from "~app/common/types";

export const DEFAULT_REACTOTRON_CONFIG: IReactotronConfig = {
  clearOnLoad: true,
  host: "localhost",
  useAsyncStorage: true,
  logInitialState: true,
  logSnapshots: false,
};
