import React from 'react';

interface ResultsPageProps {
  words: string[];
  onClose: () => void;
}

const ResultsPage = ({ words, onClose }: ResultsPageProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-lg md:max-w-4xl">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-xl font-bold">&times;</button>
        <h1 className="text-2xl font-bold text-center mb-4">Rezultāti</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((word, index) => (
            <div key={index} className="break-words uppercase">
              {`${index + 1}. ${word}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
