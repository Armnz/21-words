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
  const { word, prompt } = req.body;
  let isValid = false;
  let error = '';
  let newPrompt = null; 

  if (words.includes(word.toLowerCase())) {
    switch (true) {
      case prompt.includes('3 burtu vārds'):
        isValid = word.length === 3;
        break;
      case prompt.includes('4 burtu vārds'):
        isValid = word.length === 4;
        break;
      case prompt.includes('5 burtu vārds'):
        isValid = word.length === 5;
        break;
      case prompt.includes('6 burtu vārds'):
        isValid = word.length === 6;
        break;
      case prompt.includes('7 burtu vārds'):
        isValid = word.length === 7;
        break;
      case prompt.includes('satur'):
        isValid = word.includes(prompt.split(' ')[1]);
        break;
      case prompt.includes('beidzas ar'):
        isValid = word.endsWith(prompt.split(' ')[2]);
        break;
      default:
        isValid = prompt.startsWith('sākas ar') ? word.toLowerCase().startsWith(prompt.split(' ')[2]) : true;
    }
    if (isValid) {
      // If the word is valid, select a new prompt to return
      const randomIndex = Math.floor(Math.random() * prompts.length);
      newPrompt = prompts[randomIndex];
    } else {
      error = ' neatbilst nosacījumiem!';
    }
  } else {
    error = ' nav derīgs vārds.';
  }

  res.json({ isValid, error, prompt: newPrompt }); // Return newPrompt in the response
});



app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
