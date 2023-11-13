import React, {
  FC,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Modal as RNModal,
  View,
  ViewStyle,
  ModalProps,
  StyleProp,
} from "react-native";
import { observer } from "mobx-react-lite";

import { EModalName } from "~app/common/enums";
import { useStores } from "~app/hooks";
import { Icon } from "./Icon";
import { colors, rounding, spacing } from "~app/theme";
import { COMMON_ICON_HIT_SLOP } from "~app/common/constants";
export type TModalRef = Ref<RNModal & IModalMethods>;

interface Props extends ModalProps {
  showCloseIcon?: boolean;
  rootContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  closeIconPosition?: { top?: number; right?: number };
  name: EModalName;
  ref?: TModalRef;
}

type IModalMethods = {
  close: () => void;
};

export const Modal: FC<Props> = observer(
  forwardRef(function Modal(props: Props, ref: Ref<IModalMethods>) {
    const {
      children,
      showCloseIcon = true,
      closeIconPosition = {},
      name,
      contentContainerStyle,
      rootContainerStyle,
      ...rest
    } = props;
    const {
      modalStore: { toggleModal, registerModal, getModalPropsByName },
    } = useStores();
    useEffect(() => {
      name && registerModal(name);
    }, []);

    const onClosePress = useCallback(() => {
      toggleModal({ name, visible: false });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          onClosePress();
        },
      }),
      [],
    );

    const CloseIcon = useMemo(
      () => (
        <Icon
          icon="x"
          color={colors.palette.neutral400}
          onPress={onClosePress}
          containerStyle={[$closeIcon, closeIconPosition]}
          hitSlop={COMMON_ICON_HIT_SLOP}
        />
      ),
      [onClosePress, closeIconPosition],
    );

    return (
      <RNModal
        transparent={true}
        statusBarTranslucent
        animationType="fade"
        {...(name && { visible: getModalPropsByName(name)?.visible })}
        {...rest}>
        <View style={[$root, rootContainerStyle]}>
          <View style={[$contentBase, contentContainerStyle]}>
            {showCloseIcon && CloseIcon}
            {children}
          </View>
        </View>
      </RNModal>
    );
  }),
);

const $root: ViewStyle = {
  backgroundColor: colors.customTransparent(0.4),
  flex: 1,
  justifyContent: "center",
};
const $contentBase: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: rounding.medium,
  margin: spacing.huge,
  zIndex: 10,
  minHeight: 200,
  padding: spacing.medium,
};
const $closeIcon: ViewStyle = {
  position: "absolute",
  top: spacing.small,
  right: spacing.small,
  zIndex: 110,
};
