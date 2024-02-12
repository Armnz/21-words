import { VercelRequest, VercelResponse } from '@vercel/node';
const words: string[] = require('../wordsList.json');
const prompts: { prompt: string }[] = require('../prompts.json');

const satisfiesPrompt = (word: string, prompt: string): boolean => {
 // Handle prompts that require a word to start with a specific letter
 if (prompt.startsWith('sākas ar')) {
  return word.startsWith(prompt.split(' ')[2]);
}
// Handle word length prompts
else if (prompt.endsWith('burtu vārds')) {
  const length = parseInt(prompt.split(' ')[0], 10);
  return word.length === length;
}
// Handle prompts that require a word to contain specific letters
else if (prompt.startsWith('satur')) {
  return word.includes(prompt.split(' ')[1]);
}
// Handle prompts that require a word to end with specific letters
else if (prompt.startsWith('beidzas ar')) {
  return word.endsWith(prompt.split(' ')[2]);
}
return false;};

export function POST(req: VercelRequest, res: VercelResponse) {
  const { word, prompt } = req.body;

  // Check if the word satisfies the prompt condition
  if (!satisfiesPrompt(word.toLowerCase(), prompt)) {
    return res.status(400).json({ isValid: false, error: `Neatbilst nosacījumiem!` });
  }

  // Check if the word exists in the word list
  const isValid = words.includes(word.toLowerCase());
  const error = isValid ? '' : `Nav derīgs vārds.`;
  const newPrompt = isValid ? prompts[Math.floor(Math.random() * prompts.length)] : null;

  res.status(200).json({ isValid, error, prompt: newPrompt });
}