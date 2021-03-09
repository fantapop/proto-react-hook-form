import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { UncontrolledFormFieldProps, useUnregisterOnHide } from "./Shared";

type Props = {
} & UncontrolledFormFieldProps;

const Input = styled.input`

`;

const TextInput = (props: Props) => {

  const { register } = useFormContext();

  const { path } = props;

  useUnregisterOnHide(props);

  // register needs to receive 'task.title'
  return (
    <Input placeholder={path} {...register(path)} />
  );
}

export default TextInput;
