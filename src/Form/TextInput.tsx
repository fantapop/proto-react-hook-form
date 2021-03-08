import styled from "@emotion/styled";
import { FieldValues, Path } from "react-hook-form";
import { UncontrolledFormFieldProps, useUnregisterOnHide } from "./Shared";

type Props<Name extends string, TFieldValues extends any, ParentPath = void> = {
} & UncontrolledFormFieldProps<TFieldValues, (ParentPath extends string ? `${ParentPath}.${Name}` : Name)>;

const Input = styled.input`

`;

const TextInput = <Name extends string, TFieldValues extends FieldValues, ParentPath = void>(props: Props<Name, TFieldValues, ParentPath>) => {
  const {
    formController,
    path,
  } = props;

  const { register } = formController;

  useUnregisterOnHide(props);

  // register needs to receive 'task.title'
  return (
    <Input placeholder={path} {...register(path as unknown as Path<TFieldValues>)} />
  );
}

export default TextInput;
