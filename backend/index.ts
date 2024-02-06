import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors()); 
const port = 3001; // Ensure this port does not conflict with Next.js app

const wordsFilePath = path.join(__dirname, 'words.json');
const words = JSON.parse(fs.readFileSync(wordsFilePath, 'utf-8'));

app.use(express.json());

app.post('/check-word', (req, res) => {
  const { word } = req.body;
  const isValid = words.includes(word);
  res.json({ isValid });
});

app.listen(port, () => {
  console.log(`Backendo server listening at http://localhost:${port}`);
});
