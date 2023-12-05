import React, { useEffect, useRef } from 'react';

const MathKeyboard = ({ onSymbolClick }) => {
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (window.Desmos && calculatorRef.current) {
      const calculator = window.Desmos.Calculator(calculatorRef.current);

      calculator.observeEvent('change', () => {
        const expressions = calculator.getState().expressions.list;

        if (expressions && expressions.length > 0) {
          const latestExpression = expressions[expressions.length - 1];

          if (latestExpression.latex) {
            // Send the LaTeX representation of the symbol
            onSymbolClick(latestExpression.latex);
          }
        }
      });
    }
  }, [onSymbolClick]);

  return (
    <div ref={calculatorRef} style={{ width: '900px', height: '350px' }}></div>
  );
};

export default MathKeyboard;
