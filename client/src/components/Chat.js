import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MathKeyboard from './MathKeyboard';


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const senderName = 'You';
  const botName = 'Virtual TA';

  const messageContainerRef = useRef(null);

  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Create a new user message
    const userMessage = {
      text: inputText,
      sender: senderName,
    };

    // Update the messages array with the new user message
    setMessages([...messages, userMessage]);

    // Clear the input field
    setInputText('');

    setIsLoading(true);  // Set loading to true when sending a message
  };

  useEffect(() => {
    // Check if the latest message is from the user
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.sender === senderName) {
      const userMessageText = latestMessage.text;

      const fetchBotResponse = async () => {
        // Fetch data from the backend
        const responseText = await simulateBackendResponse(userMessageText);
        setIsLoading(false);  // Set loading to false when response is received

        // Create a new bot message
        const botResponse = {
          text: responseText,
          sender: botName,
        };

        // Update the messages array with the bot's response
        setMessages([...messages, botResponse]);
      };

      fetchBotResponse();
    }
  }, [messages]);

  const simulateBackendResponse = async (userMessageText) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/ask', { question: userMessageText });
      return response.data.response;
    } catch (error) {
      console.error('Error fetching response from backend:', error);
      return "Sorry, I couldn't process your request.";
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message container
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpenKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  const handleInsertMath = (math) => {
    setInputText((prevInput) => prevInput + math);
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

      {/* no styling done yet for the loading class */}
      {isLoading && <div className="loading">Generating response...</div>}

      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleOpenKeyboard}>Open Math Keyboard</button>
      </div>
      {showKeyboard && (
        <MathKeyboard onSymbolClick={handleInsertMath} />
      )}
    </div>
  );
};

export default Chat;
