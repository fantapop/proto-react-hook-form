import styled from "@emotion/styled";
import { BriefFormValues } from "../Model/BriefFormValues";
import { UncontrolledFormFieldProps } from "./Shared";
import TextInput from "./TextInput";

type Props<TFieldValues extends BriefFormValues> = {
} & UncontrolledFormFieldProps<TFieldValues, `task.${number}`>;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Task = <TFieldValues extends BriefFormValues>(props: Props<TFieldValues>) => {
  const {
    formController,
    path,
    unregisterOnUnmount,
  } = props;

  const typePath = `${path}.type` as const;
  const titlePath = `${path}.title` as const;
  const descriptionPath = `${path}.description` as const;

  return (
    <TaskContainer>
      Task: {path}
      <TextInput<'type', TFieldValues, typeof path>
        formController={formController}
        path={typePath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
      <TextInput<'title', TFieldValues, typeof path>
        formController={formController}
        path={titlePath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
      <TextInput<'description', TFieldValues, typeof path>
        formController={formController}
        path={descriptionPath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
    </TaskContainer>
  )
};

export default Task;
