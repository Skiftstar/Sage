import dotenv from "dotenv";
import path from 'path'
//import { PromptProccessor } from "prompt-proccessing/PromptProccessor"
import { PromptProccessor } from "../Prompt-Proccessing/PromptProcess";
import { prompt } from "../AI-Bridge/index";

// Load environment variables from .env file
dotenv.config({ path : path.resolve(__dirname, '../../.env') })

const proccesser : PromptProccessor = PromptProccessor.getProccessor();

export async function promptfull(originalPrompt : string, context: { [key: string]: any }) : Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    proccesser.process(originalPrompt,context).then(async (resolvedPrompt) => {
      prompt(resolvedPrompt).then((resolved) =>{
        resolve(resolved)
      })
    })
  });
}
