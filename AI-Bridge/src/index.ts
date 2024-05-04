import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from 'path'

// Load environment variables from .env file
dotenv.config({ path : path.resolve(__dirname, '../../.env') })

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN!);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function prompt(prompt : string) : Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
  // For text-only input, use the gemini-pro model

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
  resolve(text);
});
}
