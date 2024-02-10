import React from 'react';

interface ResultsPageProps {
  words: string[];
  onClose: () => void; // Add a prop for closing the modal
}

const ResultsPage: React.FunctionComponent<ResultsPageProps> = ({ words, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="relative modal bg-white p-4 rounded-lg max-w-md w-1/2">
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-xl font-bold">&times;</button>
        <div className="modal-content text-center">
          <h1 className="text-xl font-bold">Results</h1>
          <div className="modal-body mt-4">
            <ol className="list-decimal list-inside">
              {words.map((word, index) => (
                <li key={index} className="uppercase">{word}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
