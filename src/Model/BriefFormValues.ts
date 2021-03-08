export enum TaskType {
  capture = 'capture',
  share = 'share',
};

export type TaskValue = {
  id: string;
  description: string;
  title: string;
  type: TaskType;
};

export type BriefFormValues = {
  title: string;
  tasks: TaskValue[];
};
