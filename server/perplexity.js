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
            body: `{"messages":[{"role":"system","content":"You are an artificial intelligence in charge of helping a user create a reasonable budget and suggest 5 cities in 5 countries to match their interests. You will need to output 4 reasonable numbers and 5 cities and nothing else for Food, Health, Travel, and Other, and 5 cities  in that order to represent a good budget for the user and 5 ideal places to visit. Be concise and short and do not output anything else besides 4 numbers and 5 cities."},{"role":"user","content":"Give a reasonable budget for the user who has a transaction history depicted by the requested transactional data: ${reqData} and an annual income of ${user.income}. Additionally, given a list of things that the user likes depicted by this string: ${user.interests}, reccommend 5 cities in 5 countries that provide ideal experiences for these interests.  Please format it as a String in this way: x1 x2 x3 x4 y5 y6 y7 y8 y9 where x1 is a number representing for the predicted reasonable budget for Food, x2 represents Health, x3 represents Travel, x4 represents Other, y5 is formatted as City,Country abbreviated with no spaces, y6 is formatted as City,Country abbreiviated with no spaces, y7 is formatted as City,Country abbreviated with no spaces, y8 is formatted as City,Country abbreviated with no spaces, and y9 is formatted as City,Country abbreviated with no spaces. Please categorize the transactions accordingly according to the transaction history. Do not return anything else besides 4 numbers and 5 City,Countries in this order: Food, Health, Travel, Other, City/Country1, City/Country2, City/Country3, City/Country4, City/Country 5. Do not explain the reasoning, as I only want the 4 numbers and 5 places."}],"max_tokens":1001,"stream":false,"model":"llama-3.1-sonar-small-128k-online","search_domain_filter":[],"temperature":1}`
          };
          
          fetch('https://api.perplexity.ai/chat/completions', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
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