import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MathKeyboard from './MathKeyboard';

// Chat component for handling conversation between a user and a virtual TA.
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const senderName = 'You';
  const botName = 'Virtual TA';

  const messageContainerRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Handles changes in the chat input field.
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Sends a message when the Enter key is pressed.
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handles sending a new message.
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      text: inputText,
      sender: senderName,
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);
  };

  // Fetches the response from the virtual TA.
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.sender === senderName) {
      const userMessageText = latestMessage.text;

      const fetchBotResponse = async () => {
        const responseText = await simulateBackendResponse(userMessageText);
        setIsLoading(false);

        const botResponse = {
          text: responseText,
          sender: botName,
        };

        setMessages([...messages, botResponse]);
      };

      fetchBotResponse();
    }
  }, [messages]);

  // Simulates a response from the backend.
  const simulateBackendResponse = async (userMessageText) => {
    try {
      const systemState = 'your system state here';
      const response = await axios.post('http://127.0.0.1:5000/api/ask', {
        question: userMessageText,
        system: systemState,
      });

      return response.data.response;
    } catch (error) {
      console.error('Error fetching response from backend:', error);
      return "Sorry, I couldn't process your request.";
    }
  };

  // Automatically scrolls to the bottom of the message container.
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Toggles the visibility of the math keyboard.
  const handleOpenKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  // Handles inserting math expressions into the chat input.
  const handleInsertMath = (math) => {
    setInputText((prevInput) => prevInput + math);
  };

  return (
    <div className="chat-container">
      {/* Message display area */}
      <div className="message-container" ref={messageContainerRef}>
        {messages.slice().reverse().map((message, index) => (
          <div key={index} className={`message ${message.sender === senderName ? 'user' : 'bot'}`}>
            <strong>{message.sender === senderName ? senderName : botName}: </strong>
            {message.text}
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && <div className="loading">Generating response...</div>}

      {/* Chat input area */}
      <div className="input-container">
        <input type="text" value={inputText} onChange={handleInputChange} onKeyPress={handleInputKeyPress} />
        <button onClick={handleOpenKeyboard}>Open Math Keyboard</button>
      </div>

      {/* Math keyboard component */}
      {showKeyboard && <MathKeyboard onMathInput={handleInsertMath} />}
    </div>
  );
};

export default Chat;