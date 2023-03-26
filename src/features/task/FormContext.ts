import { createFormContext } from '@mantine/form';

export type TaskProps =  {
  loading: boolean;
  purpose: string;
  candidates: string[];
  namingConvention: string;
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
