import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MathKeyboard from './MathKeyboard';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const senderName = 'You';
  const botName = 'Virtual TA';

  const messageContainerRef = useRef(null);

  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key press
      handleSendMessage(inputText);
    }
  };

  const handleSendMessage = (text) => {
    if (text.trim() === '') return;

    // Create a new user message
    const userMessage = {
      text: text,
      sender: senderName,
    };

    // Update the messages array with the new user message
    setMessages([...messages, userMessage]);

    // Clear the input field
    setInputText('');

    if (showKeyboard) {
      setShowKeyboard(false);
    }
  };

  const handleInsertMath = (math) => {
    // Check for the multiplication and division symbols and handle them
    if (math === '\\cdot') {
      // Append the multiplication sign to the existing input text only when there's no existing math symbol
      setInputText((prevText) => {
        if (prevText && !prevText.endsWith(' ')) {
          return prevText + '*';
        } else {
          return prevText + '*';
        }
      });
    } else if (math === '\\frac{ }{ }') {
      // Append the division sign to the existing input text only when there's no existing math symbol
      setInputText((prevText) => {
        if (prevText && !prevText.endsWith(' ')) {
          return prevText + '/';
        } else {
          return prevText + ' /';
        }
      });
    } else if (math === '\\sin\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\sin\\left\\(\\right\\)/g, 'sin( )');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'sin()';
        } else {
          return updatedText + 'sin()';
        }
      });
    } else if (math === '\\cos\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\cos\\left\\(\\right\\)/g, 'cos()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'cos()';
        } else {
          return updatedText + ' cos()';
        }
      });
    } else if (math === '\\tan\\left(\\right)') {
     
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\tan\\left\\(\\right\\)/g, 'tan()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'tan()';
        } else {
          return updatedText + 'tan()';
        }
      });
    } else if (math === '\\csc\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\csc\\left\\(\\right\\)/g, 'csc()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'csc()';
        } else {
          return updatedText + 'csc()';
        }
      });
    } else if (math === '\\sec\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\sec\\left\\(\\right\\)/g, 'sec()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'sec()';
        } else {
          return updatedText + 'sec()';
        }
      });
    } else if (math === '\\cot\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\cot\\left\\(\\right\\)/g, 'cot()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'cot()';
        } else {
          return updatedText + 'cot()';
        }
      });
    } else if (math === '\\sin^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\sin\^{-1}\\left\\(\\right\\)/g, 'sin^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'sin^-1()';
        } else {
          return updatedText + 'sin^-1()';
        }
      });
    } else if (math === '\\cos^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\cos\^{-1}\\left\\(\\right\\)/g, 'cos^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'cos^-1()';
        } else {
          return updatedText + 'cos^-1()';
        }
      });
    } else if (math === '\\tan^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\tan\^{-1}\\left\\(\\right\\)/g, 'tan^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'tan^-1()';
        } else {
          return updatedText + 'tan^-1()';
        }
      });
    } else if (math === '\\csc^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\csc\^{-1}\\left\\(\\right\\)/g, 'sin^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'csc^-1()';
        } else {
          return updatedText + ' csc^-1()';
        }
      });
    } else if (math === '\\sec^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\sec\^{-1}\\left\\(\\right\\)/g, 'sec^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'sec^-1()';
        } else {
          return updatedText + 'sec^-1()';
        }
      });
    } else if (math === '\\cot^{-1}\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\cot\^{-1}\\left\\(\\right\\)/g, 'cot^-1()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'cot^-1()';
        } else {
          return updatedText + 'cot^-1()';
        }
      });
    } else if (/\\d/.test(math)) {
      // Handle numbers 0-9
      setInputText((prevText) => {
        const updatedText = prevText + math;
    
        return updatedText;
      });
    
    } else if (math === '\\pi') {
    
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\pi/g, 'π');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'π';
        } else {
          return updatedText + ' π';
        }
      });
      
    } else if (math === '\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\left\\(\\right\\)/g, '()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '()';
        } else {
          return updatedText + ' ()';
        }
      });
    } else if (math === '\\left|\\right|') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\left\\|\\right\\|/g, '||');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '||';
        } else {
          return updatedText + ' ||';
        }
      });
    } else if (math === '1') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(1, '1');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '1';
        } else {
          return updatedText + '1';
        }
      });
    } else if (math === '2') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(2, '2');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '2';
        } else {
          return updatedText + '2';
        }
      });
    } else if (math === '3') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(3, '3');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '3';
        } else {
          return updatedText + '3';
        }
      });
    } else if (math === '4') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(4, '4');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '4';
        } else {
          return updatedText + '4';
        }
      });
    } else if (math === '5') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(5, '5');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '5';
        } else {
          return updatedText + ' 5';
        }
      });
    } else if (math === '6') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(6, '6');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '6';
        } else {
          return updatedText + '6';
        }
      });
    } else if (math === '7') {
      // Replace \left|\right| with ||
      setInputText((prevText) => {
        const updatedText = prevText.replace(7, '7');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '7';
        } else {
          return updatedText + '7';
        }
      });
    } else if (math === '8') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(8, '8');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '8';
        } else {
          return updatedText + '8';
        }
      });
    } else if (math === '9') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(9, '9');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '9';
        } else {
          return updatedText + '9';
        }
      });
    } else if (math === '0') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(0, '0');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '0';
        } else {
          return updatedText + '0';
        }
      });
    } else if (math === '-') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace('-', '-');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '-';
        } else {
          return updatedText + '-';
        }
      });
    } else if (math === '+') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace('+', '+');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '+';
        } else {
          return updatedText + '+';
        }
      });
    } else if (math === '=') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace('=', '=');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '=';
        } else {
          return updatedText + '=';
        }
      });
    } else if (math === '<') {
      // Replace \left|\right| with ||
      setInputText((prevText) => {
        const updatedText = prevText.replace('<', '<');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '<';
        } else {
          return updatedText + '<';
        }
      });
    } else if (math === '>') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace('>', '>');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '>';
        } else {
          return updatedText + '>';
        }
      });
    } else if (math === '\\sqrt{ }') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\sqrt\{ \}/g, 'sqrt()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'sqrt()';
        } else {
          return updatedText + ' sqrt()';
        }
      });
    } else if (math === '-') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace('-', '-');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '-';
        } else {
          return updatedText + '-';
        }
      });
    } else if (math === '\\le') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\le/g, '<=');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '<=';
        } else {
          return updatedText + '<=';
        }
      });
    } else if (math === '\\ge') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\ge/g, '>=');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + '>=';
        } else {
          return updatedText + '>=';
        }
      });
    } else if (math === '\\log\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\log\\left\(\\right\)/g, 'log()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'log()';
        } else {
          return updatedText + 'log()';
        }
      });
    } else if (math === '\\ln\\left(\\right)') {
      
      setInputText((prevText) => {
        const updatedText = prevText.replace(/\\ln\\left\(\\right\)/g, 'ln()');
    
        if (updatedText && !updatedText.endsWith(' ')) {
          return updatedText + 'ln()';
        } else {
          return updatedText + 'ln()';
        }
      });
    
    } else {
      // Map LaTeX symbols to Desmos-friendly representations
      const latexToDesmosMap = {
        '^': '**',   // Exponent (^) to **
        '/': '\\div',  // Division (/) to \div (keeping it for other cases)
        '_': '_',      // Underscore (_) as is (no conversion)
        // Add more mappings as needed
      };

      // Replace LaTeX symbols with Desmos-friendly representations
      const desmosMath = math.replace(/./g, (match) => latexToDesmosMap[match] || match);
      
    }
  };

  useEffect(() => {
    // Check if the latest message is from the user
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.sender === senderName) {
      const userMessageText = latestMessage.text;

      // Simulate TA's response after a delay when the user hits Enter
      if (userMessageText.trim() !== '') {
        const taResponse = "Sorry, I couldn't process your request.";
        const botResponse = {
          text: taResponse,
          sender: botName,
        };

        setTimeout(() => {
          setMessages([...messages, botResponse]);
        }, 1000);
      }
    }
  }, [messages, senderName, botName]);

  // Scroll to the bottom of the message container
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpenKeyboard = () => {
    setShowKeyboard(true);
  };

  const handleCloseKeyboard = () => {
    setShowKeyboard(false);
  };
  

  return (
    <div className="chat-container">
      <div className="message-container" ref={messageContainerRef}>
        {messages.slice().reverse().map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === senderName ? 'user' : 'bot'}`}
          >
            {message.sender === senderName ? (
              <strong>{message.sender}: </strong>
            ) : (
              <strong>{botName}: </strong>
            )}
            {message.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={showKeyboard ? handleCloseKeyboard : handleOpenKeyboard}>
          {showKeyboard ? "Close Math Keyboard" : "Open Math Keyboard"}
        </button>
      </div>
      {showKeyboard && (
        <MathKeyboard onSymbolClick={handleInsertMath} />
      )}
    </div>
  );
};
//! Stuff to try and graph the function in desmos, seems too complicated so on the backburner for now.
    // // Check for the word "graph" in the inputText
    // if (inputText.toLowerCase().includes('graph')) {
    //   // Extract functions from inputText to graph
    //   // This is a placeholder for the actual logic you would use
    //   const functionsToGraph = extractFunctions(inputText);
    //   // You might want to graph these functions using Desmos API
    // }

    // const extractFunctions = (text) => {

    //   const functionRegex = /(\b\w+\([^)]*\)|\b\w+\^\w+)/g;

    //   // Check if the word "graph" is in the sentence
    //   if (!text.toLowerCase().includes('graph')) {
    //     return []; // Return an empty array if "graph" is not present
    //   }

    //   // Find all matches for the function pattern
    //   const matches = text.match(functionRegex);

    //   // If there are no matches, return an empty array
    //   if (!matches) {
    //     return [];
    //   }

    //   // Filter out any false positives if necessary, and return the matches
    //   return matches.filter((match) => {
    //     // Additional filtering logic can be added here if needed
    //     return true;
    //   });
    // };

export default Chat;
