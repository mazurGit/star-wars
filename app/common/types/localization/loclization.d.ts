import { resources } from "../../../localization";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "screens";
    resources: (typeof resources)["en"];
  }
}
