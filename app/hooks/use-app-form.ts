import {
  useForm,
  UseFormHandleSubmit,
  DefaultValues,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  ValidationMode,
  FormState,
  UseFormSetFocus,
  UseFormGetValues,
  UseFormGetFieldState,
  UseFormSetError,
  UseFormClearErrors,
  UseFormTrigger,
  UseFormStateReturn,
  UseFormResetField,
  UseFormUnregister,
  UseFormRegister,
} from "react-hook-form";
import type { Control, FieldValues } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Schema } from "joi";

export type UseAppFormParams<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
  validationSchema?: Schema;
};

export type UseAppFormResult<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  isDirty: FormState<T>["isDirty"];
  errors: FormState<T>["errors"];
  isValid: FormState<T>["isValid"];
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  setFocus: UseFormSetFocus<T>;
  getValues: UseFormGetValues<T>;
  getFieldState: UseFormGetFieldState<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  trigger: UseFormTrigger<T>;
  formState: UseFormStateReturn<T>;
  resetField: UseFormResetField<T>;
  unregister: UseFormUnregister<T>;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = "onSubmit",
  validationSchema,
}: UseAppFormParams<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
    reset,
    setValue,
    watch,
    setFocus,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    trigger,
    formState,
    resetField,
    unregister,
    register,
  } = useForm<T>({
    defaultValues,
    mode,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    isDirty,
    errors,
    isValid,
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    reset,
    setValue,
    watch,
    setFocus,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    trigger,
    formState,
    resetField,
    unregister,
    register,
  };
};

export { useAppForm };
