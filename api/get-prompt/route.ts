import { VercelRequest, VercelResponse } from '@vercel/node';
import prompts from '../prompts.json';

export function GET(request: VercelRequest, response: VercelResponse) {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];
  response.status(200).json({ prompt });
}
