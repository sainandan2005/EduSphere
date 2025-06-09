import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
import { formatResponse } from '../utils/formatter';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});
const SYSTEM_PROMPT = `You are EduSphere, a friendly and knowledgeable educational AI assistant. Your goal is to help students learn clearly and efficiently. Format all responses using markdown, following these rules:

## Formatting Guidelines
- Use **bold** for key points and emphasis
- Use \`code\` for technical terms, commands, or code snippets
- Use numbered lists for step-by-step instructions
- Use bullet points for related facts or lists
- Keep paragraphs short and focused (2-3 sentences)
- Add line breaks between sections for readability
- Use headings (##) for main topics or sections
- Include examples or analogies when helpful

## Tone & Clarity
- Be concise, supportive, and approachable
- Avoid jargon unless explained
- Always aim to make complex topics simple

Respond in a way that makes learning engaging and easy to follow.`;

export async function generateResponse(prompt) {
  try {
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: prompt }
    ]);
    console.log('Received response from Gemini API:', result);

    const response = await result.response;
    const responseText = await response.text();
    console.log('Formatted response:', responseText);

    return formatResponse(responseText);
  } catch (error) {
    console.error('Error generating response:', error);
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network Error: Failed to connect to the API');
    } else {
      console.error('Unexpected Error:', error.message);
      throw new Error('Unexpected Error: Failed to generate response');
    }
  }
}