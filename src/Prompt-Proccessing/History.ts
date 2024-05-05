import { PromptPostTransformer } from "./PromptPostProcessor";
import { PromptTransformer } from "./PromptTransformer";
import { Prompt } from "./Prompt";

import {  } from "fuse.js"

const Fuse = require('fuse.js');

const fuseOptions = {
	isCaseSensitive: false,
	// includeScore: false,
	shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.3,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"keyword",
	]
};


export class History implements PromptPostTransformer , PromptTransformer{
    currentConversation : ConversationData[] = [
        new ConversationData("smartin","very smart")
    ]

    adjustAnswer(prompt :Prompt,answer : string, promptHistory : Prompt[]) : Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            //scan prompt and answer for data
            resolve(answer)
        })
      }

    transform(prompt :Prompt, promptHistory : Prompt[]) : Promise<Prompt> {
        return new Promise<Prompt>(async (resolve, reject) => {
            //search for keywords and add keyword context for later filtering
            const fuse = new Fuse(this.currentConversation, fuseOptions);
            const keyWords = prompt.getMainPrompt().split(" ");

            for (const keyword of keyWords) {
                const results = fuse.search(keyword)
                const resultStringified = JSON.stringify(results)
                prompt.setMainPrompt(prompt.getMainPrompt() +"\n"+resultStringified);
            }
            resolve(prompt)
        })
    }
}

class ConversationData{
    public keyword : string
    public data :string

    constructor(key:string,data:string){
        this.keyword = key;
        this.data = data;
    }
}