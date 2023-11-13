import { Namespace } from "i18next";
import { useTranslation as I18translation } from "react-i18next";

import { Translation } from "~app/common/types";
import { en } from "~app/localization";

export const useTranslation = (
  namespaces: Namespace = Object.keys(en) as unknown as (keyof Translation)[],
) => I18translation(namespaces);
