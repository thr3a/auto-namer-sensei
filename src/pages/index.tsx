import type { NextPage, GetServerSideProps } from 'next';
import { TaskForm } from '@/features/task/Form';
import { Text } from '@mantine/core';

type Props = {
  csrfToken: string;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader('X-CSRF-Token') || 'missing';
  return { props: { csrfToken } };
};

const IndexPage: NextPage<Props> = ({ csrfToken }) => {
  return (
    <>
      <TaskForm csrfToken={csrfToken}></TaskForm>
    </>
  );
};

export default IndexPage;
