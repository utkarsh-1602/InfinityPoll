import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ChatBody = ({messages, auth, typingStatus}) => {
  const history = useHistory();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    history.push('/');
    window.location.reload();
  };

  return (
      <div>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
          {messages.map((message) =>
          message.name === auth.user.username ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}


        {/*This is triggered when a user is typing*/}
        <div className="message__status">
        <p>{typingStatus}</p>
      </div>
      </div>
      </div>

  );
};

export default connect(
  store => ({
    auth: store.auth,
  }),
)(ChatBody); //The brackets around Navbar in the connect function indicate that Navbar is the component being connected to the Redux store.
