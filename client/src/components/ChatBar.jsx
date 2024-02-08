import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatBar = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:4000/api/auth');
        console.log("response: " , response);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
            <ul>
            {users.map(user => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatBar; //The brackets around Navbar in the connect function indicate that Navbar is the component being connected to the Redux store.
