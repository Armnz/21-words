import type { Request, Response } from 'next';
import fs from 'fs';
import path from 'path';

import prompts from '../data/prompts.json';
import wordList from '../data/wordsList.json';

// TypeScript type assertions
const promptsArray: string[] = prompts as string[];
const wordListArray: string[] = wordList as string[];


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

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { word, prompt } = req.body;

  if (!word || !prompt) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Word and prompt are required.' }));
    return;
  }

  if (!satisfiesPrompt(word.toLowerCase(), prompt)) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(JSON.stringify({ isValid: false, error: 'Neatbilst nosacījumiem!' }));
    return;
  }

  const isValid = wordListArray.includes(word.toLowerCase());
  const error = isValid ? '' : 'Nav derīgs vārds.';
  let newPrompt: string | null = null;

  if (isValid) {
    const newPromptIndex = Math.floor(Math.random() * promptsArray.length);
    newPrompt = promptsArray[newPromptIndex];
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ isValid, error, newPrompt }));
}