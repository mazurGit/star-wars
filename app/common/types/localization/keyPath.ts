import { en } from "~app/localization";

export type Translation = typeof en;

export type TxKeyPath<T extends keyof Translation> = RecursiveKey<
  Translation[T]
>;

export type TxOptions = {
  [key: string]: string | undefined;
};

type RecursiveKey<TObj extends object> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends object
    ? `${TKey}.${RecursiveKey<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];
