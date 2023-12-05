import React, { useState } from 'react';

// SideMenu component for managing chat sessions within a sidebar menu.
const SideMenu = ({ menuId, contentId }) => {
  const [chatSessions, setChatSessions] = useState([]); // State to store chat sessions.
  const [selectedChat, setSelectedChat] = useState(null); // State to store the selected chat session.
  const [editingChat, setEditingChat] = useState(null); // State to store the chat session being edited.

  // Function to handle creating a new chat session.
  const handleNewChat = () => {
    const newChatSession = `Chat Session ${chatSessions.length + 1}`;
    setChatSessions([...chatSessions, newChatSession]);
    setEditingChat(null);
  };

  // Function to handle selecting a chat session.
  const handleChatClick = (index) => {
    setSelectedChat(index === selectedChat ? null : index);
  };

  // Function to handle renaming a chat session.
  const handleRenameChat = (index, newName) => {
    const updatedChatSessions = [...chatSessions];
    updatedChatSessions[index] = newName;
    setChatSessions(updatedChatSessions);
    setEditingChat(null);
    setSelectedChat(null);
  };

  // Function to handle removing a chat session.
  const handleRemoveChat = (index) => {
    const updatedChatSessions = chatSessions.filter((_, i) => i !== index);
    setChatSessions(updatedChatSessions);
    setSelectedChat(null);
  };

  // Function to handle 'Enter' key press in edit mode.
  const handleKeyPress = (index, event) => {
    if (event.key === 'Enter') {
      handleRenameChat(index, event.target.value);
    }
  };

  return (
    <div>
      <div id={menuId} className="sidenav">
        <div className="header">
          <button className="new-chat-btn" onClick={handleNewChat}>
            + New Chat
          </button>
        </div>
        <div className="chat-sessions">
          {chatSessions.map((session, index) => (
            <div key={index} className="chat-session">
              {index === editingChat ? (
                <input
                  type="text"
                  className={`chat-session-input ${index === selectedChat ? 'selected-chat' : ''}`}
                  value={session}
                  onChange={(event) => setChatSessions(
                    chatSessions.map((s, i) => (i === index ? event.target.value : s))
                  )}
                  onBlur={() => handleRenameChat(index, chatSessions[index])}
                  onKeyPress={(event) => handleKeyPress(index, event)}
                  autoFocus
                />
              ) : (
                <div>
                  <p
                    className={index === selectedChat ? 'selected-chat' : ''}
                    onClick={() => handleChatClick(index)}
                  >
                    {session}
                  </p>
                </div>
              )}
              {index === selectedChat && (
                <div className="edit-btns">
                  <button className="edit-btn" onClick={() => setEditingChat(index)}>
                    Edit
                  </button>
                  <button className="edit-btn" onClick={() => handleRemoveChat(index)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <hr />
        <div className="profile-section">
          <p>Amy Hong</p>
          <button className="profile-btn" onClick={() => console.log("View Profile clicked")}>
            ...
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;