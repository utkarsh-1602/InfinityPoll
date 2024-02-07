import React from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:4000');
console.log("Socket: ", socket);

// Event listener for 'messageResponse' event from the server
socket.on('messageResponse', (data) => {
    // Handle the response from the server
    console.log('Message received from server:', data);
});

const ChatPage = ({isAuthenticated }) => {

    if (!isAuthenticated) return <Redirect to="/login" />;
    console.log("CHATPAGE SOCKET===> ", socket)

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};
export default ChatPage;  