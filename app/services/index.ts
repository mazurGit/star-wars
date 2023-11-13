import { MMKV } from "react-native-mmkv";
import RNReactotron from "reactotron-react-native";

import { Storage } from "./storage.service";
import { Reactotron } from "./reactotron.service";
import { App } from "./app.service";
import { Api } from "./api.service";
import { DEFAULT_API_CONFIG } from "~app/common/constants";
import { AppLifeCycle } from "./app.lifecycle.service";

export const api = new Api({ config: DEFAULT_API_CONFIG });
export const storage = new Storage(new MMKV());
export const reactotron = new Reactotron({
  reactotron: RNReactotron,
  storage,
});
export const app = new App({ reactotron });
export const appLifeCycle = new AppLifeCycle({
  apiService: api,
});
