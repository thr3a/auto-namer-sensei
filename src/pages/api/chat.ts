import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from 'langchain/chat_models';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';

export type SuccessResponseProps = {
  status: 'ok';
  result: string;
};

export type ErrorResponseProps = {
  status: 'ng';
  errorMessage: string;
};

export type ResponseProps = SuccessResponseProps | ErrorResponseProps;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseProps>) {
  if (req.method !== 'POST') {
    res.status(405).json({
      status: 'ng',
      errorMessage: 'Not allowed method'
    });
    res.end();
    return;
  }

  try {
    const chat = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_APIKEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0,
    });

    const response = await chat.call([
      new SystemChatMessage(req.body.system_message),
      new HumanChatMessage(req.body.human_message)
    ]);
    res.status(200).json({status: 'ok', result: response.text});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 'ng', errorMessage: 'Internal Server Error'});
  }
  res.end();
}
