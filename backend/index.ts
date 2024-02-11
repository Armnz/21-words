import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

// Load the word list and prompts from JSON files
const wordsFilePath = path.join(__dirname, 'words-long.json');
const words = JSON.parse(fs.readFileSync(wordsFilePath, 'utf-8'));
const promptsFilePath = path.join(__dirname, 'prompts.json');
const prompts = JSON.parse(fs.readFileSync(promptsFilePath, 'utf-8'));

app.use(express.json());

// Endpoint to get a random game prompt
app.get('/get-prompt', (req, res) => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];
  res.json({ prompt });
});

// Function to check if a word satisfies the prompt condition
const satisfiesPrompt = (word: string, prompt: string) => {
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
  return false;
};

// Endpoint to check if a word is valid and satisfies the prompt
app.post('/check-word', (req, res) => {
  const { word, prompt } = req.body;
  
  // First, check if the word satisfies the prompt condition
  if (!satisfiesPrompt(word.toLowerCase(), prompt)) {
    return res.json({ isValid: false, error: `neatbilst nosacījumiem!` });
  }
  // Then check if the word is in the word list
  const isValid = words.includes(word.toLowerCase());
  
  // Prepare error message if the word does not exist in the list
  const error = isValid ? '' : `nav derīgs vārds.`;
  const newPrompt = isValid ? prompts[Math.floor(Math.random() * prompts.length)] : null;
  
  res.json({ isValid, error, prompt: newPrompt });
});


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
