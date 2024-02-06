'use client';

import axios from 'axios';

import { useState } from 'react';

export default function Home() {
	const [word, setWord] = useState('');
	const [isValid, setIsValid] = useState<boolean | null>(null);

	const checkWord = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/check-word', { word });
			setIsValid(response.data.isValid);
		} catch (error) {
			console.error('Error checking word:', error);
		}
	};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-6"> {/* Adjusted for vertical layout */}
            <form onSubmit={checkWord} className="flex flex-col items-center space-y-4"> {/* Adjusted for spacing */}
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ievadi vārdu"
                    className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {isValid !== null && (
                    <p className="text-lg mt-2">
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
