import { TaskProps } from '@/features/task/FormContext';

export const assistantPrompt = (value: TaskProps): string => {
  return `
As an IT expert, please suggest 10 appropriate ${value.type} names in ${value.namingConvention} format that would be suitable for describing the processing overview.
Your suggestions must be in a single line format, separated by commas.
overview: ${value.purpose}
suggestions:
  `.replace(/^\s+|\s+$/g, '');
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
