import React, {
  forwardRef,
  MutableRefObject,
  ForwardRefRenderFunction,
} from "react";
import { TextInput } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

import { TextField, TextFieldProps } from "./TextField";

interface Props<T extends FieldValues = FieldValues>
  extends Omit<
    TextFieldProps,
    "onChangeText" | "value" | "helper" | "defaultValue"
  > {
  name: Path<T>;
  control: Control<T>;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  controlFieldValue?: (text: string) => string;
}

function forwardedTextField<T extends FieldValues>(
  { rules, name, control, controlFieldValue, ...restProps }: Props<T>,
  ref: MutableRefObject<TextInput | null>,
) {
  return (
    <Controller<T>
      rules={rules}
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref: hookRef },
        fieldState: { error },
      }) => {
        return (
          <TextField
            value={value}
            ref={reference => {
              hookRef(reference);
              if (ref) {
                ref.current = reference;
              }
            }}
            onChangeText={text => {
              onChange(controlFieldValue ? controlFieldValue(text) : text);
            }}
            helper={error?.message}
            {...restProps}
            {...(error && { status: "error" })}
          />
        );
      }}
    />
  );
}

export const ControlledTextField = forwardRef(
  forwardedTextField as ForwardRefRenderFunction<TextInput>,
) as <T extends FieldValues>(
  props: Props<T> & { ref?: MutableRefObject<TextInput | null> },
) => ReturnType<typeof forwardedTextField>;
