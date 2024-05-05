import {PromptTransformer} from './PromptTransformer';
import { PromptPostTransformer } from './PromptPostProcessor';
import {Prompt} from "./Prompt";

type AIModel = (inputString: string) => Promise<string>;
export class PromptProccessor{
    
    private static proccessor: PromptProccessor;

    public transformers: PromptTransformer[] = [];

    public postTransfomers: PromptPostTransformer[] = [];

    public promptHistory: Prompt[] = [];

    constructor() {
    
    }

    public async processWithAi(textPrompt : string, context: { [key: string]: any }, ai : AIModel ) :Promise<string>{
        return new Promise<string>(async (resolve, reject) => {
            let prompt:Prompt = new Prompt(textPrompt,context);
            for (const transformer of this.transformers) {
                prompt = await transformer.transform(prompt, this.promptHistory);
            }
            let answer : string = await ai(prompt.getMainPrompt());
            for (const transformer of this.postTransfomers) {
                answer = await transformer.adjustAnswer(prompt,answer, this.promptHistory);
            }
            this.promptHistory.push(prompt)
            resolve(answer);
        });
    }

    public registertransFomer(transformer: PromptTransformer):void{
        this.transformers.push(transformer);
    }



    public static getProccessor(){
        if(this.proccessor!=undefined) {
            return this.proccessor;
        } else {
            this.proccessor = new PromptProccessor();
            return this.proccessor;
        }
    }
}