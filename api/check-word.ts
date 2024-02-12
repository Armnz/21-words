import type { VercelRequest, VercelResponse } from '@vercel/node';
import words from './wordsList.json';
import prompts from './prompts.json'; 

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

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {
    const { word, prompt } = req.body;

    // Check if the word satisfies the prompt condition
    if (!satisfiesPrompt(word.toLowerCase(), prompt)) {
      return res.json({ isValid: false, error: `${word} neatbilst nosacījumiem!` });
    }

    // Check if the word is in the word list
    const isValid = words.includes(word.toLowerCase());
    const error = isValid ? '' : `${word} nav derīgs vārds.`;
    const newPrompt = isValid ? prompts[Math.floor(Math.random() * prompts.length)] : null;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json({ isValid, error, prompt: newPrompt });
  } else {
    // Handle non-POST requests or return an error message
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
