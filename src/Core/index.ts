import dotenv from "dotenv";
import path from 'path'
import { PromptProccessor } from "../Prompt-Proccessing/PromptProcessor";
import { prompter } from "../AI-Bridge/index";
import { History } from "../Prompt-Proccessing/History";

// Load environment variables from .env file
dotenv.config({ path : path.resolve(__dirname, '../../.env') })

const proccesser : PromptProccessor = PromptProccessor.getProccessor();
const history : History = new History();

proccesser.transformers.push(history)
proccesser.postTransfomers.push(history)

export async function promptfull(originalPrompt : string, context: { [key: string]: any }) : Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    proccesser.processWithAi(originalPrompt,context,prompter).then(answer => {
      resolve(answer)
    })
  });
}
