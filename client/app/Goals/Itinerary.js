const OpenAI = require('openai');

const generateItin = async (goal,interests) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json'
            },
            body: `{"model":"llama-3.1-sonar-small-128k-online","max_tokens":1000,"temperature":1.5,"stream":false,"messages":[{"content":"You are an AI travel assistant tasked with creating a 7-day itinerary for a user. Your job is to generate exactly 1 activity per day for each of the 7 days, based on the user’s interests and the location they are visiting. The activities should be specific to the travel location and align with the user’s preferences.  Your output must strictly follow this format: - Day 1: Activity - Day 2: Activity - Day 3: Activity - Day 4: Activity - Day 5: Activity - Day 6: Activity - Day 7: Activity  Do not deviate from this format. Ensure that each activity is relevant to the location and tailored to the user\'s interests. Use only English words, and make sure to only name the activity for each day. Avoid additional descriptions, explanations, or extra characters like punctuation or new lines.","role":"system"},{"role":"user","content":"Provide a 7-day itinerary with 1 activity per day for a user who is visiting ${goal} and is interested in ${interests} Please ensure the activities align with the user\'s interests and are local to Spain. The output must strictly follow this format:  - Day 1: Activity - Day 2: Activity - Day 3: Activity - Day 4: Activity - Day 5: Activity - Day 6: Activity - Day 7: Activity  Please provide only the activity name for each day. Do not include any additional information, explanations, or characters outside of this format. Use only English words and ensure consistency in the structure."}],"top_k":10}`
          };
          
          const response = await fetch('https://api.perplexity.ai/chat/completions', options);
          const result = await response.json();
          return {
              success: true,
              completion: result.choices[0]?.message?.content,  // Ensure to extract correct part
          };
    }
    catch (error) {
        console.error('Error generating itin ', error);
        return {
            success: false,
            message: 'Error generating itin',
            error: error.message,
        };
    }
}

module.exports = { generateItin };