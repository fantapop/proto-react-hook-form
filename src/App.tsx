import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { BriefFormValues } from './Model/BriefFormValues';
import TextInput from './Form/TextInput';
import Task from './Form/Task';
import { v4 as uuidv4 } from 'uuid';

const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
`;

const Button = styled.button`
`;

const Submit = styled.input`
`;

const App = () => {

  const formMethods = useForm<BriefFormValues>();
  const {
    control,
    handleSubmit,
  } = formMethods;

  const onSubmit = useCallback((data: BriefFormValues) => console.log('Submit', data), []);

  const [showTasks, setShowTasks] = useState(true);
  const toggleShowTasks = useCallback(() => {
    setShowTasks(!showTasks);
  }, [showTasks]);

  const { fields: tasks, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'tasks'
  });

  const addTask = useCallback(() => {
    append({id: uuidv4()});
  }, [append]);

  const moveLastTaskToFront = useCallback(() => {
    if (tasks.length) {
      move(tasks.length - 1, 0);
    }
  }, [move, tasks]);

  const removeMiddle = useCallback(() => {
    if (tasks.length) {
      remove(Math.floor(tasks.length / 2));
    }
  }, [remove, tasks]);

  return (
    <AppContainer>
      <Button onClick={toggleShowTasks}>Show Tasks</Button>
      <Button onClick={addTask}>Add Task to End</Button>
      <Button onClick={moveLastTaskToFront}>Move Last Task to Front</Button>
      <Button onClick={removeMiddle}>Remove Middle</Button>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {true && (
            <TextInput
              path="title"
              unregisterOnUnmount={true}
            />
          )}
          {showTasks && tasks.map((task, i) =>
            <Task
              key={task.id}
              prefix={`tasks.${i}`}
            />
          )}
          <Submit type="submit" />
        </Form>
      </FormProvider>
    </AppContainer>
  );
};

export default App;
