import React from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';

const HomePage = props => (
  <div>
    <ErrorMessage />
    <Polls {...props} />
    {/* The spread operator {...props} is used to pass all props received by the HomePage component down to the Polls component
        This allows the Polls component to have access to the same props that HomePage received, enabling it to utilize any data or functionality passed down from higher-level components or the Redux store.
    */}
  </div>
);

export default HomePage;
