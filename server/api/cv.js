const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/cv', async (req, res) => {
    const { experience, education, skills } = req.body;

    // Lógica para generar sugerencias usando OpenAIssdf
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Genera un CV con la siguiente información:\nExperiencia: ${experience}\nEducación: ${education}\nHabilidades: ${skills}`,
        max_tokens: 150,
    });

    res.json({ cvContent: completion.data.choices[0].text });
});