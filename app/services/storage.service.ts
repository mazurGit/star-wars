import { MMKV } from "react-native-mmkv";

import { EStorageKey } from "~app/common/enums/storage-key";
import { TStorageResult, TStorageValueType } from "~app/common/types";

export class Storage {
  storage: MMKV;
  constructor(MMKV: MMKV) {
    this.storage = MMKV;
  }

  save = (key: EStorageKey, value: TStorageValueType) => {
    let valueToSaved = value;
    if (typeof value === "object") {
      valueToSaved = JSON.stringify(value);
    }
    this.storage.set(key, valueToSaved as string);
  };

  load: TStorageResult = (key, type) => {
    switch (type) {
      case "boolean":
        return this.storage.getBoolean(key);
      case "number":
        return this.storage.getNumber(key);
      case "object":
        try {
          return JSON.parse(this.storage.getString(key)!);
        } catch (e) {
          return null;
        }
      default:
        return this.storage.getString(key);
    }
  };

  clear = () => {
    this.storage.clearAll();
  };

  remove = (key: string) => {
    this.storage.delete(key);
  };

  getAllKeys = () => {
    return this.storage.getAllKeys();
  };

  contains = (key: string) => {
    return this.storage.contains(key);
  };
  /**
   * Reactotron methods only, please don't use it for other purposes
   */
  setItem = async (key: any, value: TStorageValueType) => {
    return new Promise(resolve => {
      resolve(this.save(key, value));
    });
  };

  getItem = (key: string): Promise<TStorageValueType> => {
    return new Promise(resolve => {
      resolve(this.load(key as any, "object"));
    });
  };
}
