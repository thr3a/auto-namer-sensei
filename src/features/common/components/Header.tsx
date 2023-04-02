import { Title, Center, Text, Divider } from '@mantine/core';

export const Header = () => {
  return (
    <>
      <Center mt={20} mb={20} mx="auto">
        <Title order={1}>命名先生</Title>
      </Center>
      <Text mb={20}>概要を伝えるとAI先生が自動で変数名や関数名を命名してくれます。</Text>
    </>
  );
};
