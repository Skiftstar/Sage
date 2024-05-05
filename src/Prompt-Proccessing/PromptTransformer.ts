import {Prompt} from './Prompt';

export interface PromptTransformer {

  transform : (prompt :Prompt, promptHistory : Prompt[]) => Promise<Prompt>
}