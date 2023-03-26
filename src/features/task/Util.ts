import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return value.purpose.replace(/^\s+|\s+$/g, '');
};

export const supportedNamingConventions: {name: string, label: string}[] = [
  {
    name: 'camel case',
    label: 'キャメルケース 例:getFullYear'
  },
  {
    name: 'pascal case',
    label: 'パスカルケース 例:GetFullYear'
  },
  {
    name: 'snake case',
    label: 'スネークケース 例:get_full_year'
  },
  {
    name: 'kebab case',
    label: 'ケバブケース 例:get-full-year'
  }
];
