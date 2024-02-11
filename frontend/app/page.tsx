'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ResultsPage from '../components/ResultsPage';

const Home = () => {
    const [word, setWord] = useState<string>(''); // Explicitly type `word` as string
    const [prompt, setPrompt] = useState<string>(''); // Explicitly type `prompt` as string
    const [error, setError] = useState<string>(''); // Explicitly type `error` as string
    const [validWords, setValidWords] = useState<string[]>([]); // Explicitly type `validWords` as an array of strings
    const [showResults, setShowResults] = useState<boolean>(false); // Explicitly type `showResults` as boolean
    const [gameStarted, setGameStarted] = useState<boolean>(false); // Explicitly type `gameStarted` as boolean
    const [timer, setTimer] = useState<number>(60); // Explicitly type `timer` as number
  
    useEffect(() => {
      let intervalId: any;
      if (gameStarted && timer > 0) {
        intervalId = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
      } else if (timer === 0 || validWords.length >= 21) {
        setShowResults(true);
        clearInterval(intervalId);
      }
      return () => clearInterval(intervalId);
    }, [gameStarted, timer, validWords.length]);
  
    const handleClose = () => {
      setShowResults(false);
      setGameStarted(false);
      setValidWords([]);
      setError('');
      setTimer(60);
    };
  
    const fetchPrompt = async () => {
      const response = await axios.get('http://localhost:3001/get-prompt');
      setPrompt(response.data.prompt);
    };
  
    const checkWord = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validWords.includes(word)) {
        setError(`${word} jau tika izmantots!`);
        setWord('');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:3001/check-word', { word, prompt });
        if (!response.data.isValid) {
          setError(`${word} ${response.data.error}`);
        } else {
          setValidWords(prevWords => [...prevWords, word]);
          setError('');
          if (validWords.length + 1 >= 21) {
            setShowResults(true);
          } else {
            fetchPrompt();
          }
        }
        setWord('');
      } catch (error) {
        console.error('Error checking word:', error);
      }
    };
  
    const startGame = () => {
      setGameStarted(true);
      setTimer(60);
      setValidWords([]);
      setError('');
      setShowResults(false);
      fetchPrompt();
    };
  
    if (showResults) {
      const completedWords = validWords.concat(Array(21 - validWords.length).fill('-'));
      return <ResultsPage words={completedWords} onClose={handleClose} />;
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl md:text-4xl font-bold my-8 md:my-12">21 VĀRDS</h1>
      {!gameStarted ? (
        <button onClick={startGame} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Sākt spēli!
        </button>
      ) : (
        <>
          <p className="text-lg font-bold">Laiks: {timer} sekundes</p>
          <div className="w-full max-w-md space-y-6">
            <p className="text-lg">{prompt}</p>
            <form onSubmit={checkWord} className="flex flex-col items-center space-y-4">
              <input
                type="text"
                name="word"
                value={word}
                onChange={e => setWord(e.target.value)}
                placeholder="Ievadi vārdu"
                className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
