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
    // Append the math symbol to the existing input text only when there's no existing math symbol
    setInputText((prevText) => {
      if (prevText && !prevText.endsWith(' ')) {
        return prevText + math;
      } else {
        return prevText + ' ' + math;
      }
    });
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

export default Chat;