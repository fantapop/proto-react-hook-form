import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useFieldArray, useForm } from 'react-hook-form';
import { BriefFormValues } from './Model/BriefFormValues';
import TextInput from './Form/TextInput';
import { FormController } from './Form/Shared';
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

  const {
    control,
    register,
    handleSubmit,
    unregister,
    getValues,
  } = useForm<BriefFormValues>();

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

  const formController: FormController<BriefFormValues> = useMemo(() => ({
    register,
    unregister,
  }), [register, unregister]);

  // const taskElements = useMemo(() => {
  //   const taskElements = [];
  //   for (let i = 0; i < taskCount; i++) {
  //     taskElements.push(
  //         <Task
  //           formController={formController}
  //           path={`tasks.${i}` as const}
  //           unregisterOnUnmount={true}
  //         />
  //     );
  //   }
  //   return taskElements;
  // }, [taskCount, formController]);

  return (
    <AppContainer>
      <Button onClick={toggleShowTasks}>Show Tasks</Button>
      <Button onClick={addTask}>Add Task to End</Button>
      <Button onClick={moveLastTaskToFront}>Move Last Task to Front</Button>
      <Button onClick={removeMiddle}>Remove Middle</Button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {true && (
          <TextInput<'title', BriefFormValues>
            formController={formController}
            path="title"
            unregisterOnUnmount={true}
          />
        )}
        {showTasks && tasks.map((task, i) =>
          <Task
            key={task.id}
            id={task.id}
            formController={formController}
            path={`tasks.${i}` as const}
            unregisterOnUnmount={true}
          />
        )}
        <Submit type="submit" />
      </Form>
    </AppContainer>
  );
};

export default App;
