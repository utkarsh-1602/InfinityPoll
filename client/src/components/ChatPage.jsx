import React, { useEffect, useState } from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import socketIO from 'socket.io-client';


export const socket = socketIO.connect('https://infinity-poll-server.vercel.app');
console.log("Socket: ", socket);

// Event listener for 'messageResponse' event from the server
socket.on('messageResponse', (data) => {
    // Handle the response from the server
    console.log('Message received from server:', data);
});

const ChatPage = ({isAuthenticated }) => {

    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');


    if (!isAuthenticated) return <Redirect to="/login" />;
    console.log("CHATPAGE SOCKET===> ", socket)

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        socket.on('typingResponse', (data) => setTypingStatus(data));
      }, [socket, messages]);
    

  return (
    <div className="chat">
    <ChatBar socket={socket} />
    <div className="chat__main">
      <ChatBody messages={messages} typingStatus={typingStatus} />
      <ChatFooter socket={socket} />
    </div>
  </div>

  );
};
export default ChatPage;  