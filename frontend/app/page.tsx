"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [word, setWord] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null); // To store error messages

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await axios.get('http://localhost:3001/get-prompt');
      setPrompt(response.data.prompt);
    };
    fetchPrompt();
  }, []);

  const checkWord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/check-word', { word, prompt });
      setIsValid(response.data.isValid);
      if (!response.data.isValid) {
        setError(response.data.error); // Ensure this line is in your code to handle displaying errors
      } else {
        setError(''); // Clear any previous error message
      }
    } catch (error) {
      console.error('Error checking word:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        <p className="text-lg">{prompt}</p>
        <form onSubmit={checkWord} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            name="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Ievadi vārdu"
            className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {error && <p className="text-lg mt-2 text-red-500">{error}</p>}
          {!error && isValid !== null && (
            <p className={`text-lg mt-2 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
              {isValid ? 'Vārds atrodas vārdnīcā!' : 'Vārds nav atrodams.'}
            </p>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Pārbaudi vārdu
          </button>
        </form>
      </div>
    </div>
  );
}
