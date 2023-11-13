/* eslint-disable react-hooks/rules-of-hooks */
import RNReactotron from "reactotron-react-native";
import { ArgType } from "reactotron-core-client";
import { Platform } from "react-native";
import { mst } from "reactotron-mst";
import { onSnapshot } from "mobx-state-tree";

import { DEFAULT_REACTOTRON_CONFIG } from "~app/common/constants";
import { IReactotronConfig } from "~app/common/types";
import { goBack, navigate, resetRoot } from "~app/helpers/navigation";
import { Storage } from "./storage.service";
import { RootStoreTree } from "~app/common/types/stores/root-store";

export class Reactotron {
  private config = DEFAULT_REACTOTRON_CONFIG;
  private reactotronIsSetUp = false;
  private reactotron: typeof RNReactotron;
  private storage: Storage;

  constructor({
    reactotron,
    storage,
  }: {
    reactotron: typeof RNReactotron;
    storage: Storage;
  }) {
    this.reactotron = reactotron;
    this.storage = storage;
  }

  setupReactotron(customConfig: IReactotronConfig = {}) {
    // only run this in dev..
    if (__DEV__) {
      // only setup once.
      if (this.reactotronIsSetUp) return;

      // merge the passed in config with our default config
      Object.assign(this.config, customConfig);

      // configure reactotron
      this.reactotron.configure({
        name: this.config.name || require("../../package.json").name,
        host: this.config.host,
      });

      // hookup middleware
      if (Platform.OS !== "web") {
        const { setAsyncStorageHandler, useReactNative } = this.reactotron;
        if (this.config.useAsyncStorage && setAsyncStorageHandler) {
          setAsyncStorageHandler(this.storage);
        }
        useReactNative({
          asyncStorage: this.config.useAsyncStorage ? undefined : false,
        });
      }

      // ignore some chatty `mobx-state-tree` actions
      const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/;

      // hookup mobx-state-tree middleware
      this.reactotron.use(
        mst({
          filter: event => RX.test(event.name) === false,
        }),
      );

      // connect to the app
      this.reactotron.connect();

      // custom reactotron commands
      this.reactotron.onCustomCommand({
        title: "Reset Root Store",
        description: "Resets the MST store",
        command: "resetStore",
        handler: () => {
          this.reactotron.log!("resetting store");
          this.storage.clear();
        },
      });

      this.reactotron.onCustomCommand({
        title: "Reset Navigation State",
        description: "Resets the navigation state",
        command: "resetNavigation",
        handler: () => {
          this.reactotron.log!("resetting navigation state");
          resetRoot({ index: 0, routes: [] });
        },
      });

      this.reactotron.onCustomCommand({
        command: "navigateTo",
        handler: args => {
          const { route } = args;
          if (route) {
            console.log(`Navigating to: ${route}`);
            navigate(route);
          } else {
            console.log("Could not navigate. No route provided.");
          }
        },
        title: "Navigate To Screen",
        description: "Navigates to a screen by name.",
        args: [
          {
            name: "route",
            type: ArgType.String,
          },
        ],
      });

      this.reactotron.onCustomCommand({
        title: "Go Back",
        description: "Goes back",
        command: "goBack",
        handler: () => {
          this.reactotron.log!("Going back");
          goBack();
        },
      });

      // clear if we should
      if (this.config.clearOnLoad) {
        this.reactotron.clear!();
      }

      this.reactotronIsSetUp = true;
    }
  }

  setReactotronRootStore(
    rootStore: RootStoreTree,
    initialData: RootStoreTree | null,
  ) {
    if (__DEV__) {
      const { logInitialState, logSnapshots } = this.config;
      const name = "ROOT STORE";

      // logging features
      if (logInitialState) {
        this.reactotron.display({
          name,
          value: initialData,
          preview: "Initial State",
        });
      }

      // log state changes?
      if (logSnapshots) {
        onSnapshot(rootStore, snapshot => {
          this.reactotron.display({
            name,
            value: snapshot,
            preview: "New State",
          });
        });
      }

      // tracks the current MobX-State-Tree tree in Reactotron's "State" tab
      this.reactotron.trackMstNode!(rootStore);
    }
  }

  logError(e: Error | unknown, stack?: any) {
    this.reactotron.error!(e, stack || null);
  }
}
