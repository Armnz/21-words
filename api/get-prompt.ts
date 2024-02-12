import { VercelRequest, VercelResponse } from '@vercel/node';
import prompts from './prompts.json';

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    // Generate a random index based on the number of prompts
    const randomIndex = Math.floor(Math.random() * prompts.length);
    // Select a random prompt using the random index
    const prompt = prompts[randomIndex];
    // Set CORS headers to allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Respond with the selected prompt
    res.json({ prompt });
  } else {
    // Respond with an error if the request method is not GET
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
