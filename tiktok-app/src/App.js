import React from 'react';
import UserInfo from './components/UserInfo';
import Carousel from './components/Carousel';
import useToken from './components/Token/useToken';

function App() {
  const accessToken = useToken(); // Get access token from custom hook

  return (
    <div className="App">
      {accessToken ? (
        <>
          <UserInfo accessToken={accessToken} />
          <Carousel accessToken={accessToken} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
