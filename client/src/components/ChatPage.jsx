import React from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { logout } from '../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const ChatPage = ({ socket, isAuthenticated }) => {

    if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};
export default connect(
    store => ({
      auth: store.auth,
    }),
    { logout },
  )(ChatPage); //The brackets around Navbar in the connect function indicate that Navbar is the component being connected to the Redux store.
  