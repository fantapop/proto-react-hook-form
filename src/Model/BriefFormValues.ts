export enum TaskType {
  capture = 'capture',
  share = 'share',
};

export type TaskValue = {
  description: string;
  title: string;
  type: TaskType;
};

export type BriefFormValues = {
  title: string;
  task: TaskValue[];
};
