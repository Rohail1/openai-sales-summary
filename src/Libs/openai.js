const OpenAIApi = require('openai');

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY
});

async function SummarizeData(data) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "developer", content: "You are a helpful assistant that provides human readable summary of the data." },
      {
        role: "user",
        content: `Write a simple human readable summary for the provided ecommerce data. Below is the data \n ${JSON.stringify(data)}`,
      },
    ],
    store: false,
  });

  return completion

}

module.exports = {
  SummarizeData,
}