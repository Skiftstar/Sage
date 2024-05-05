import {Prompt} from './Prompt';

export interface PromptPostTransformer {

  adjustAnswer : (prompt :Prompt,answer : string, promptHistory : Prompt[]) => Promise<string>
  
}