import React, { useState } from 'react';
import { connect } from 'react-redux';

const ChatFooter = ({socket, auth}) => {
  const [message, setMessage] = useState('');

  if (!socket) {
    console.error('Socket is not initialized');
  }

  console.log("footer: ", socket);

  const handleSendMessage = (e) => {
    console.log("hey I'm here")
    e.preventDefault();
    if (message.trim()) {
      console.log("its working")
      try {
        socket.emit('message', {
            text: message,
            name: auth.user.username,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
    } catch (error) {
        console.error("Error emitting message:", error);
    }
    
    }
    console.log("its not working  ")
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};
export default connect(
  store => ({
    auth: store.auth,
  }),
)(ChatFooter);