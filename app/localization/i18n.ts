import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./languages/en";

export const resources = {
  en,
};

i18n.use(initReactI18next).init({
  nsSeparator: ":",
  ns: Object.keys(en),
  defaultNS: "screens",
  compatibilityJSON: "v3",
  fallbackLng: "en",
  lng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});
