import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

const wordsFilePath = path.join(__dirname, 'words-long.json');
const words = JSON.parse(fs.readFileSync(wordsFilePath, 'utf-8'));
const promptsFilePath = path.join(__dirname, 'prompts.json');
const prompts = JSON.parse(fs.readFileSync(promptsFilePath, 'utf-8'));

app.use(express.json());

app.get('/get-prompt', (req, res) => {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  const prompt = prompts[randomIndex];
  res.json({ prompt });
});

app.post('/check-word', (req, res) => {
  const { word, prompt } = req.body; // Assuming prompt is passed along with the word
  const requiredStartLetter = prompt.split(" ").pop()?.toLowerCase();
  const firstLetterOfWord = word[0]?.toLowerCase();

  if (!requiredStartLetter || firstLetterOfWord !== requiredStartLetter) {
    res.json({ isValid: false, error: 'nesākas ar ' + requiredStartLetter });
    return;
  }

  const isValid = words.includes(word.toLowerCase());
  if (!isValid) {
    res.json({ isValid: false, error: 'Vārds nav atrodams.' }); // 'Word not found.'
    return;
  }

  res.json({ isValid: true });
});


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
