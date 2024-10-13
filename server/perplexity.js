import OpenAI from 'openai';
const perplexity= new OpenAI({apiKey:'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',baseURL:'https://api.perplexity.ai/'});
async function predictedBudget(transactions){
    try{
        const reqData={
            transactions:transactions.map((transac)=>{
                return ``
            })
        }
    }
}