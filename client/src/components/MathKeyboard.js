import React from 'react';

const MathSymbolsKeyboard = ({ onSymbolClick }) => {
  const mathSymbols = [
    '+',
    '-',
    '×',
    '÷',
    '=',
    '≠',
    '≈',
    '≥',
    '≤',
    '∫',
    '∑',
    '√',
    '∞',
    'π',
    'θ',
    'Φ',
    'Σ',
    'Δ',
    '∇',
  ];

  return (
    <div className="latex-keyboard">
      {mathSymbols.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onSymbolClick(symbol)}
          className="math-button"
        >
          {symbol}
        </button>
      ))}
    </div>
  );
};

export default MathSymbolsKeyboard;
