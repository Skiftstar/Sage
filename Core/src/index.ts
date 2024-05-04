import dotenv from "dotenv";
import path from 'path'
import { PromptProccessor } from "prompt-proccessing/PromptProccessor"

// Load environment variables from .env file
dotenv.config({ path : path.resolve(__dirname, '../../.env') })

export async function prompt(prompt : string, context: { [key: string]: any }) : Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
  resolve("");
});
}
