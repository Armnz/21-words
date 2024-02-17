import type { NextApiRequest, NextApiResponse } from 'next';

import prompts from '../data/prompts.json';
import wordList from '../data/wordsList.json';

const promptsArray: string[] = prompts as unknown as string[];
const wordListArray: string[] = wordList as unknown as string[];


const satisfiesPrompt = (word: string, prompt: string): boolean => {
  if (prompt.startsWith('sākas ar')) {
    return word.startsWith(prompt.split(' ')[2]);
  } else if (prompt.endsWith('burtu vārds')) {
    const length = parseInt(prompt.split(' ')[0], 10);
    return word.length === length;
  } else if (prompt.startsWith('satur')) {
    return word.includes(prompt.split(' ')[1]);
  } else if (prompt.startsWith('beidzas ar')) {
    return word.endsWith(prompt.split(' ')[2]);
  }
  return false;
};

export function POST(req: NextApiRequest) {
  if (req.method !== 'POST') {
    // Ideally, you should handle non-POST requests properly.
    // However, directly returning a new Response like this isn't standard in Next.js API routes.
  }

  const { word, prompt } = req.body;

  if (!word || !prompt) {
    return new Response(JSON.stringify({ error: 'Word and prompt are required.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (!satisfiesPrompt(word.toLowerCase(), prompt)) {
    return new Response(JSON.stringify({ isValid: false, error: 'Neatbilst nosacījumiem!' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const isValid = wordListArray.includes(word.toLowerCase());
  const error = isValid ? '' : 'Nav derīgs vārds.';
  let newPrompt = null;

  if (isValid) {
    const newPromptIndex = Math.floor(Math.random() * promptsArray.length);
    newPrompt = promptsArray[newPromptIndex]; // Ensure this matches your actual data structure
  }

  return new Response(JSON.stringify({ isValid, error, newPrompt }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}