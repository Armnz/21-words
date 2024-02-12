import type { VercelRequest, VercelResponse } from '@vercel/node';
import prompts from './prompts.json';
export default function(req: VercelRequest, res: VercelResponse) {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];
  res.json({ prompt });
}
