import { createFormContext } from '@mantine/form';

export type TaskProps =  {
  loading: boolean;
  type: 'variable' | 'function';
  purpose: string;
  candidates: string[];
  namingConvention: 'camel case' | 'pascal case' | 'snake case' | 'kebab case';
}

export const [TaskFormProvider, useTaskFormContext, useTaskForm] = createFormContext<TaskProps>();
