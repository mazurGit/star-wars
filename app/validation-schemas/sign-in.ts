import * as Joi from "joi";
import i18next from "i18next";

import { TUserSignInDto } from "~app/common/types";

const signIn = Joi.object<TUserSignInDto>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": i18next.t("errors:wrongEmail"),
      "string.empty": i18next.t("errors:emptyField"),
    }),
  password: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": i18next.t("errors:emptyField"),
    }),
});

export { signIn };
