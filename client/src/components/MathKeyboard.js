import React, { useEffect, useRef } from 'react';

// MathKeyboard component integrates a Desmos calculator into the React app.
const MathKeyboard = () => {
  // useRef is used to create a reference to the div element where the calculator will be displayed.
  const calculatorRef = useRef(null);

  // useEffect hook to instantiate the Desmos calculator after the component mounts.
  useEffect(() => {
    // Checks if the Desmos library is loaded and the ref is attached to the div element.
    if (window.Desmos && calculatorRef.current) {
      // Initializes the Desmos Calculator in the referenced div element.
      window.Desmos.Calculator(calculatorRef.current);
    }
  }, []); // Empty dependency array ensures this effect runs once after the component mounts.

  // Renders a div element that will contain the Desmos calculator.
  return (
    <div ref={calculatorRef} style={{ width: '900px', height: '500px' }}></div>
  );
};

export default MathKeyboard;