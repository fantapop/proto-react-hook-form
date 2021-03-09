import React from 'react';
import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { BriefFormValues, TaskValue } from "../Model/BriefFormValues";
import TextInput from "./TextInput";
import dottedGet from 'lodash.get';
import { isNullishCoalesce } from 'typescript';

type Props = {
  prefix: string;
};

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Task = (props: Props) => {
  const { prefix } = props;

  const { getValues } = useFormContext();
  const task: TaskValue | undefined = dottedGet(getValues(), prefix);
  console.log('task is:', task);

  if (!task) {
    return null;
  }

  const unregisterOnUnmount = true;
  const typePath = `${prefix}.type`;
  const titlePath = `${prefix}.title`;
  const descriptionPath = `${prefix}.description`;

  return (
    <TaskContainer>
      Task: {prefix} ({task.id})
      <TextInput
        path={typePath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
      <TextInput
        path={titlePath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
      <TextInput
        path={descriptionPath}
        unregisterOnUnmount={unregisterOnUnmount}
      />
    </TaskContainer>
  )
};

export default Task;
