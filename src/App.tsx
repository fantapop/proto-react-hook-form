import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { BriefFormValues } from './Model/BriefFormValues';
import TextInput from './Form/TextInput';
import { FormController } from './Form/Shared';
import Task from './Form/Task';

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
    register,
    handleSubmit,
    unregister,
  } = useForm<BriefFormValues>();

  const onSubmit = useCallback((data: BriefFormValues) => console.log('Submit', data), []);

  const [showName, setShowName] = useState(true);
  const toggleShowName = useCallback(() => {
    setShowName(!showName);
  }, [showName]);

  const formController: FormController<BriefFormValues> = useMemo(() => ({
    register,
    unregister,
  }), [register, unregister]);

  return (
    <AppContainer>
      <Button onClick={toggleShowName}>Toggle</Button>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {true && (
          <TextInput<'title', BriefFormValues>
            formController={formController}
            path="title"
            unregisterOnUnmount={true}
          />
        )}
        {showName && (
          <Task
            formController={formController}
            path="task.0"
            unregisterOnUnmount={true}
          />
        )}
        <Submit type="submit" />
      </Form>
    </AppContainer>
  );
};

export default App;
