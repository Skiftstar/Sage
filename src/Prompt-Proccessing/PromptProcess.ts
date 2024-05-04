
import {PromptTransformer} from './PromptTransformer';
export class PromptProccessor{
    
    private static proccessor: PromptProccessor;

    public transformers: PromptTransformer[] = [];

    private constructor() {
    
    }

    public async process(prompt : string, context: { [key: string]: any }) :Promise<string>{
        return new Promise<string>(async (resolve, reject) => {
            resolve(prompt)
        });
    }

    public registertransFomer(transformer: PromptTransformer):void{
        this.transformers.push(transformer);
    }



    public static getProccessor(){
        if(this.proccessor!=undefined){
            return this.proccessor;
        }else{
            this.proccessor = new PromptProccessor();
            return this.proccessor;
        }
    }
}