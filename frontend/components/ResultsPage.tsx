import React from 'react';

interface ResultsPageProps {
  words: string[];
  onClose: () => void;
}

// Using modern React syntax without React.FC
const ResultsPage = ({ words, onClose }: ResultsPageProps) => {
  // Helper function to create an array of arrays for columnar display
  const getColumns = () => {
    const columns: string[][] = [];
    const perColumn = Math.ceil(words.length / 3); // Adjust based on the desired number of columns
    for (let i = 0; i < 3; i++) {
      columns.push(words.slice(i * perColumn, (i + 1) * perColumn));
    }
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
      <div className="relative bg-white p-4 rounded-lg w-full max-w-lg md:max-w-2xl">
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-xl font-bold">
          &times;
        </button>
        <h1 className="text-xl font-bold text-center">Rezultāti</h1>
        <div className="flex flex-col md:flex-row justify-around mt-4">
          {columns.map((column, colIndex) => (
            <ol key={colIndex} className="list-decimal list-inside uppercase">
              {column.map((word, wordIndex) => (
                <li key={wordIndex}>{word || '-'}</li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
