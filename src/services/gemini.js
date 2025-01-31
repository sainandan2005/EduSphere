import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config';
import { formatResponse } from '../utils/formatter';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: prompt }
    ]);
    const response = await result.response;
    return formatResponse(await response.text());
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}