import { Group, Button, Title, CopyButton, Radio, TextInput, Stack, Grid } from '@mantine/core';
import { TaskFormProvider, useTaskForm } from '@/features/task/FormContext';
import { isNotEmpty } from '@mantine/form';
import { assistantPrompt, supportedNamingConventions } from '@/features/task/Util';
import type { ResponseProps, SuccessResponseProps } from '@/pages/api/chat';

export const TaskForm = (props: { csrfToken: string}) => {
  const form = useTaskForm({
    initialValues: {
      loading: false,
      type: 'variable',
      purpose: '素数かどうか判定する',
      candidates: ['isPrime', 'checkPrime', 'primeChecker', 'validatePrime'],
      namingConvention: 'camel case'
    },
    validate: {
      purpose: isNotEmpty('概要は必須項目です')
    },
  });

  const handleSubmit = async () => {
    form.setValues({ loading: true });
    const systemPrompt = `
    `;
    const reqResponse = await fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_message: systemPrompt,
        human_message: assistantPrompt(form.values),
        csrf_token: props.csrfToken,
      }),
    });
    const json = await reqResponse.json() as ResponseProps;
    if (json.status === 'ok') {
      const response = json as SuccessResponseProps;
      debugger;
      const candidates = response.result.split(',');
      form.setValues({candidates: candidates, loading: false });
    } else {
      form.setValues({loading: false });
    }
  };

  return (
    <TaskFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <Radio.Group label="命名したい種類" {...form.getInputProps('type')}>
          <Group mt="xs">
            <Radio value='variable' label='変数名' />
            <Radio value='function' label='関数名' />
          </Group>
        </Radio.Group>
        <TextInput label='変数や関数にする処理の概要を記述してください' withAsterisk {...form.getInputProps('purpose')} placeholder='素数かどうか判定する関数'/>
        <Radio.Group label="命名規則" {...form.getInputProps('namingConvention')}>
          <Stack mt="xs">
            {supportedNamingConventions.map((nc, index) => (
              <Radio key={index} value={nc.name} label={nc.label} />
            ))}
          </Stack>
        </Radio.Group>

        <Group position="center">
          <Button type="submit" loaderPosition="center" loading={form.values.loading}>作成!</Button>
        </Group>
        <Group mt="sm" mb="sm">
          <Title order={2}>生成結果</Title>
        </Group>

        {form.values.candidates.map((candidate,index) => (
          <Grid key={index}>
            <Grid.Col span={6}>
              <TextInput
                value={candidate.trim()} size="md"
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <CopyButton value={candidate.trim()}>
                {({ copied, copy }) => (
                  <Button color={copied ? 'teal' : 'blue'} onClick={copy} size="xs">
                    {copied ? 'コピーしました！' : 'クリップボードにコピー'}
                  </Button>
                )}
              </CopyButton>
            </Grid.Col>
          </Grid>
        ))}
      </form>
    </TaskFormProvider>
  );
};
// tech article
