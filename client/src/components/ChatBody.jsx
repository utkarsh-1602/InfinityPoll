import React from 'react';
import { useHistory } from 'react-router-dom';

const ChatBody = () => {
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
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        {/*This shows messages received by you*/}
        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div>

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
        </div>
      </div>
      </div>

  );
};

export default ChatBody;