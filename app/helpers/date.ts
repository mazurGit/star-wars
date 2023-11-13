import { Locale, format, parseISO } from "date-fns";
import i18n from "i18next";
import ar from "date-fns/locale/ar-SA";
import ko from "date-fns/locale/ko";
import en from "date-fns/locale/en-US";

import { DATE_FORMAT } from "~app/common/constants";

const getLocale = (): Locale => {
  const locale = i18n.language;
  return locale === "ar" ? ar : locale === "ko" ? ko : en;
};

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Parameters<typeof format>[2],
) => {
  if (!date) {
    return null;
  }
  const locale = getLocale();
  const dateOptions = {
    ...options,
    locale,
  };
  return format(
    parseISO(date),
    dateFormat ?? DATE_FORMAT.STANDARD_DATE_FORMAT,
    dateOptions,
  );
};
