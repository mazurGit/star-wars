import { EStorageKey } from "~app/common/enums";

export type TStorageValueType = number | object | string | boolean | undefined;

export type TStorageResult = <
  T,
  K extends "number" | "boolean" | "string" | "object",
>(
  key: EStorageKey,
  type: K,
) => K extends "number"
  ? number
  : K extends "boolean"
  ? boolean
  : K extends "string"
  ? string
  : T;
