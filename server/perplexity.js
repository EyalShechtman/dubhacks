const OpenAI = require('openai');
const perplexity = new OpenAI({ apiKey: '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', baseURL: 'https://api.perplexity.ai/' });

const predictedBudget = async (transactions, user) => {
    try {
        const reqData = transactions.map((transac) => {
            return `Vendor Name: ${transac.vendor_name}, Transaction Category: ${transac.category}, Amount:${transac.amount},Location:${transac.location}`;
        }).join('\n');
        const response = await perplexity.chat.completions.create({
            model: 'llama-3.1-sonar-huge-128k-online',
            stream: false,
            max_tokens: 1000,
            response_format: { type: 'json_object' },
            messages: [{
                'role': 'system',
                'content': ("You are an artificial intelligence in charge of helping a user create a reasonable budget. You will need to output a reasonable number for Food, Health, Travel, and Other to represent a good budget for the user.")
            },
            {
                'role': 'user',
                'content': (`Give a reasonable budget for the user who has a transaction history of ${reqData} and an annual income of ${user.income}. Please format it as a Json objectin this way:
                {
                Food:x
                Health:x
                Travel:x
                Other:x 
                 }   
                where x is a number representing for the predicted reasonable budget for each category. Please categorize the transactions accordingly.`)
            }]
        });
        const completion = response.choices[0].message.content;
        console.log('Budget ', completion);
        let budget;
        try {
            budget = JSON.parse(completion);
        }
        catch (parseError) {
            console.warn('unable to parse to json');
            budget = completion;
        }
        return {
            success: true,
            budget: budget,
        };
    }
    catch (error) {
        console.error('Error predicting budget', error);
        return {
            success: false,
            message: 'Error predicting budget',
            error: error.message,
        };
    }
}

module.exports = { predictedBudget };