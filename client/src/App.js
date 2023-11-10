// App.js

import React from 'react';
import './App.css';
import SideMenu from './components/SideMenu';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <SideMenu />
      <div id="main">
        <div className="center-container">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
