import { AppState, NativeEventSubscription } from "react-native";

import { Api } from "./api.service";
import { IRootStore } from "~app/common/types";

type AppLifecycleFunc = {
  onAppStarted: () => void;
  onAppFinished: () => void;
  onAppNavigatorReady: () => void;
  onAppWillGoToForeground: () => void;
  onAppWillGoToBackground: () => void;
  onUserSignIn: () => void;
  onUserSignOut: () => void;
  onUserDataReady: () => void;
};

export class AppLifeCycle implements AppLifecycleFunc {
  #apiService: Api;
  #rootStore?: IRootStore;
  #appState: AppState = AppState;
  #eventSubscription: NativeEventSubscription;

  constructor({ apiService }: { apiService: Api }) {
    this.#apiService = apiService;
    this.#eventSubscription = this.addEventListener();
  }

  setRootStore(rootStore: IRootStore) {
    this.#rootStore = rootStore;
  }

  implementsAppLifecycle = (lifecycleFunc: keyof AppLifecycleFunc) => {
    if (!this.#rootStore) {
      return;
    }

    Object.values(this.#rootStore)
      .filter(store => typeof store === "object" && lifecycleFunc in store)
      .forEach(store => {
        store[lifecycleFunc]();
      });
  };

  onAppStarted = () => {
    this.#rootStore && this.#apiService.setAuthStore(this.#rootStore.authStore);
    this.implementsAppLifecycle("onAppStarted");
  };

  onAppFinished = () => {
    this.implementsAppLifecycle("onAppFinished");
    this.#eventSubscription.remove();
  };

  onAppNavigatorReady = () => {
    this.implementsAppLifecycle("onAppNavigatorReady");
  };

  onAppWillGoToForeground = () => {
    this.implementsAppLifecycle("onAppWillGoToForeground");
  };

  onAppWillGoToBackground = () => {
    this.implementsAppLifecycle("onAppWillGoToBackground");
  };

  onUserSignIn = () => {
    this.isAuthorized && this.implementsAppLifecycle("onUserSignIn");
  };

  onUserSignOut = () => {
    this.implementsAppLifecycle("onUserSignOut");
  };

  onUserDataReady = () => {
    this.isAuthorized && this.implementsAppLifecycle("onUserDataReady");
  };

  private addEventListener = () =>
    this.#appState.addEventListener("change", state => {
      state === "active" && this.onAppWillGoToForeground();
      state === "background" && this.onAppWillGoToBackground();
    });

  private get isAuthorized() {
    return !!this.#rootStore?.authStore.authToken;
  }
}
