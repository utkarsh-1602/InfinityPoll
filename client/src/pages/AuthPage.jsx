import React from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      <ErrorMessage />
      <Auth authType={authType} />
      {/* 
          The Auth component is a child component of AuthPage.
          Even though authType is not directly used inside the Auth component, it's passed down as a prop from its parent (AuthPage).
          The Auth component can access authType through its props, but it may not use it directly. It's possible that Auth uses other props or context provided by Redux for authentication purposes.

          In React, when a parent component renders a child component and passes props to it, those props are automatically accessible within the child component, regardless of whether they are directly used or not. This is because React's component architecture allows props to flow down from parent components to their children.

      */}
    </div>
  );
};

export default AuthPage;
