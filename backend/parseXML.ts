import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

// Adjust the interface if needed based on your XML structure
interface LexicalResource {
  LexicalResource: {
    Lexicon: {
      LexicalEntry: {
        Lemma: {
          $: {
            writtenForm: string;
            partOfSpeech: string;
          };
        }[];
      }[];
    }[];
  };
}


const xmlFilePath = path.join(__dirname, 'tezaurs_2023_4_lmf.xml');
const jsonFilePath = path.join(__dirname, 'words.json');

const parseXMLAndSaveJSON = async (inputFilePath: string, outputFilePath: string) => {
  try {
    const xmlData = fs.readFileSync(inputFilePath, 'utf-8');
    const result = await parseStringPromise(xmlData) as LexicalResource;
    const words = result.LexicalResource.Lexicon[0].LexicalEntry
      .map(entry => entry.Lemma[0].$.writtenForm)
      .filter(word => !word.includes(' ')); // Exclude entries with spaces

    fs.writeFileSync(outputFilePath, JSON.stringify(words, null, 2), 'utf-8');
    console.log('Words saved to JSON file.');
  } catch (error) {
    console.error('Error parsing XML and saving to JSON:', error);
  }
};

parseXMLAndSaveJSON(xmlFilePath, jsonFilePath);
