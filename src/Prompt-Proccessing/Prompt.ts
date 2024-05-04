export class Prompt {
    private main_prompt: string;
    private context: { [key: string]: any };
    
    constructor(main_prompt: string, context: { [key: string]: any }) {
      this.main_prompt = main_prompt;
      this.context = context;
    }
    

    setMainPrompt(prompt: string): void {
        this.main_prompt = prompt;
    }
    
    getMainPrompt(): string {
        return this.main_prompt;
    }

    setContextField(key: string, value: any): void {
        this.context[key] = value;
      }
    
    getContextField(key: string): any {
        return this.context[key];
    }
  
}