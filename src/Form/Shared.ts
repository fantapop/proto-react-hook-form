import { useEffect } from "react";
import { FieldValues, UseFormRegister, UseFormUnregister, FieldPath, Field, useFormContext } from "react-hook-form";

export type FormController<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  unregister: UseFormUnregister<TFieldValues>;
};

export type UncontrolledFormFieldProps = {
  unregisterOnUnmount?: boolean;
  path: string;
};

export function useUnregisterOnHide(
  props: UncontrolledFormFieldProps
) {
  const { path, unregisterOnUnmount } = props;
  const { unregister } = useFormContext();
  useEffect(() => {
    return unregisterOnUnmount ? () => unregister(path) : undefined;
  }, []);
}
