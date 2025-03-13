import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
import { formatResponse } from '../utils/formatter';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro'});
const SYSTEM_PROMPT = `You are EduSphere, an educational AI assistant. Format your responses using markdown:
- Use **bold** for emphasis
- Use \`code\` for technical terms
- Use numbered lists for steps
- Use bullet points for related items
- Keep paragraphs short and focused
- Add line breaks between sections
- Use headings for main topics (##)`;

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