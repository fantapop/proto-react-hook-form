import { useEffect } from "react";
import { FieldValues, UseFormRegister, UseFormUnregister, FieldPath, Field } from "react-hook-form";

export type FormController<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  unregister: UseFormUnregister<TFieldValues>;
};

export type UncontrolledFormFieldProps<TFieldValues, Path = FieldPath<TFieldValues>> = {
  formController: FormController<TFieldValues>;
  path: Path;
  unregisterOnUnmount?: boolean;
};

export function useUnregisterOnHide<TFieldValues extends FieldValues, Path>(
  props: UncontrolledFormFieldProps<TFieldValues, Path>
) {
  const { formController, path, unregisterOnUnmount } = props;
  const { unregister } = formController;
  useEffect(() => {
    // register occurs elsewhere
    return unregisterOnUnmount ? () => unregister(path) : undefined;
  }, []);
}
