import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    history.push('/chat');
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
        <h3 className="poll-title">Realtime Chat</h3>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
