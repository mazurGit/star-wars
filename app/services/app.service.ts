import { Reactotron } from "./reactotron.service";

export class App {
  private reactotron: Reactotron;

  constructor({ reactotron }: { reactotron: Reactotron }) {
    this.reactotron = reactotron;
  }

  init = () => {
    this.reactotron.setupReactotron({
      // clear the Reactotron window when the app loads/reloads
      clearOnLoad: true,
      // generally going to be localhost
      host: "localhost",
      // Reactotron can monitor AsyncStorage for you
      useAsyncStorage: true,
      // log the initial restored state from AsyncStorage
      logInitialState: true,
      // log out any snapshots as they happen (this is useful for debugging but slow)
      logSnapshots: false,
    });
  };
}
