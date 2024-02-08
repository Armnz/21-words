import * as fs from 'fs';
import * as xml2js from 'xml2js';
const parser = new xml2js.Parser();

fs.readFile('tezaurs_2023_4_tei.xml', (err, data) => {
    if (err) throw err;
    parser.parseString(data, (err, result) => {
        if (err) throw err;

        const entries = result.TEI.body[0].entry as Array<{ $: { sortKey: string } }>;
        const wordsSet = new Set<string>();

        entries.forEach(entry => {
            const sortKey = entry.$.sortKey;
            const firstWord = sortKey.split(' ')[0];

            // Updated regex to exclude words with 'w', 'q', 'y', 'x' and allow only specific characters
            // Now also excludes words that contain numbers or special characters
            const isValidWord = /^[A-Za-zāčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ]+$/;
            const excludeLetters = /^[^wqyxWQYX0-9]+$/; // Exclude 'w', 'q', 'y', 'x', and digits

            if (firstWord.length > 1 && isValidWord.test(firstWord) && excludeLetters.test(firstWord)) {
                wordsSet.add(firstWord.toLowerCase());
            }
        });

        const wordsArray = Array.from(wordsSet).sort();

        fs.writeFile('words-long.json', JSON.stringify(wordsArray, null, 2), 'utf-8', (err) => {
            if (err) throw err;
            console.log('The file has been saved with unique, valid words!');
        });
    });
});
