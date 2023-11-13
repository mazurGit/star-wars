import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { Modal } from "./Modal";
import { EModalName } from "~app/common/enums";
import { Text } from "./Text";

export const AppModalProvider: FC = observer(() => {
  const { t } = useTranslation("common");
  return (
    <>
      <Modal name={EModalName.NOTIFICATION}>
        <Text preset="bold" text="Title" />
        <Text text={t("lorem")} />
      </Modal>
    </>
  );
});
