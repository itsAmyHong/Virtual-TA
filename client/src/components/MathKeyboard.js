import React, { useEffect, useRef } from 'react';

const MathKeyboard = () => {
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (window.Desmos && calculatorRef.current) {
      window.Desmos.Calculator(calculatorRef.current);
    }
  }, []);

  return (
    <div ref={calculatorRef} style={{ width: '900px', height: '500px' }}></div>
  );
};

export default MathKeyboard;
