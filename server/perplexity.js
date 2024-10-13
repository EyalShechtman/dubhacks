const OpenAI = require('openai');

const predictedBudget = async (transactions, user) => {
    try {
        const reqData = transactions.map((transac) => {
            return `Vendor Name: ${transac.vendor_name}, Transaction Category: ${transac.category}, Amount:${transac.amount},Location:${transac.location}, Date Purchased:${transac.date}`;
        }).join('\n');
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: `{"model":"llama-3.1-sonar-small-128k-online","max_tokens":1000,"temperature":1.5,"stream":false,"messages":[{"content":"You are an artificial intelligence in charge of helping a user create a reasonable budget. You will only output 4 numbers (representing budgets for Food, Health, Travel, and Other) formatted as:  x1 | x2 | x3 | x4 | Do not include newlines or extra characters. Only output the numbers as described. For example:  200 | 300 | 400 | 500 |","role":"system"},{"role":"user","content":"Provide a reasonable budget for the user with the following transactions: Vendor: 4 Category Food purchases of ${reqData} and an annual income of ${user.income}. Please only ouput 4 numbers and nothing else. No english letters or anything else should be outputted other than 4 numbers. Seperate each number with a pipe."}],"top_k":10}`
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        const result = await response.json();
        return {
            success: true,
            completion: result.choices[0]?.message?.content,  // Ensure to extract correct part
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

const recommendedDestination = async (transactions, user) => {
    try {
        const reqData = transactions.map((transac) => {
            return `Vendor Name: ${transac.vendor_name}, Transaction Category: ${transac.category}, Amount:${transac.amount},Location:${transac.location}, Date Purchased:${transac.date}`;
        }).join('\n');
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: '{"model":"llama-3.1-sonar-small-128k-online","max_tokens":1000,"temperature":1.5,"stream":false,"messages":[{"content":"You are an artificial intelligence in charge of helping a user create a reasonable budget. You will only output 4 numbers (representing budgets for Food, Health, Travel, and Other) formatted as:  x1 | x2 | x3 | x4 | Do not include newlines or extra characters. Only output the numbers as described. For example:  200 | 300 | 400 | 500 |","role":"system"},{"role":"user","content":"Provide a reasonable budget for the user with the following transactions: Vendor: 4 Category Food purchases of 80, 2 Category health purcahses of 900, 3 Category Travel purcahses of 100, 4 Category Other purchases of 90 and an annual income of 140000. Please only ouput 4 numbers and nothing else. No english letters or anything else should be outputted other than 4 numbers. Seperate each number with a pipe."}],"top_k":10}'
        };

        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        const result = await response.json();
        return {
            success: true,
            completion: result.choices[0]?.message?.content,  // Ensure to extract correct part
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