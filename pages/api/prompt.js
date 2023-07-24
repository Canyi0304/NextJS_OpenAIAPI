import * as dotenv from 'dotenv';
import {Configuration,OpenAIApi } from 'openai';

dotenv.config({path: __dirname +'/.env'})

//const { Configuration, OpenAIApi } = require("openai");

//new: configuration의 인스턴스 생성
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res){

  if (!configuration.apiKey) {
    res.status(500),json({
      error:{
        message:"openAI API key가 작동하지 않습니다."
      }
    });
    return;
  }

  if (!configuration.apiKey) {
    res.status(429),json({
      error:{
        message:"API의 사용량 제한을 초과!"
      }
    });
    return;
  }

const prompt = req.body.prompt || '';

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You will be provided with a product description and seed words, and your task is to generate product names."
    },
    {
      "role": "user",
      "content": "Product description: A home milkshake maker\nSeed words: fast, healthy, compact."
    }
  ],
  temperature: 0.8,
  max_tokens: 256,
  prompt: `suggest three pet name foe the follow ${prompt}`
});
res.status(200).json({result: response.data.choices[0].text})
}