import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from 'path'

// Load environment variables from .env file
dotenv.config({ path : path.resolve(__dirname, '../../.env') })

export async function prompter(prompt : string) : Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    //const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN!);

    //const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // For text-only input, use the gemini-pro model

    //const result = await model.generateContent(prompt);
    //const response = await result.response;
    //const text = await response.text();
    //console.log(text);
    resolve(prompt);
  });
}
