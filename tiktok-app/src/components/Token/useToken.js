import { useState, useEffect } from 'react';
import axios from 'axios';

const useToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState('your-refresh-token');
  const [tokenExpiryTime, setTokenExpiryTime] = useState(null);

  // Fetch a new token
  const refreshAccessToken = () => {
    console.log('Refreshing token...');
    axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_key: 'your-client-key',
      client_secret: 'your-client-secret',
    })
    .then(response => {
      const { access_token, refresh_token, expires_in } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token || refreshToken);
      setTokenExpiryTime(Date.now() + expires_in * 1000);
      console.log('Token refreshed successfully');
    })
    .catch(error => {
      console.error('Error refreshing token:', error);
    });
  };

  // Set up the token refresh job
  useEffect(() => {
    if (tokenExpiryTime) {
      const timeLeft = tokenExpiryTime - Date.now();
      const refreshInterval = setTimeout(refreshAccessToken, timeLeft - 300000); // Refresh 5 minutes before expiration

      return () => clearTimeout(refreshInterval); // Clean up interval on unmount
    }
  }, [tokenExpiryTime]);

  // Initially set the token expiry and fetch user info when the component mounts
  useEffect(() => {
    refreshAccessToken(); // Refresh token immediately on first load
  }, []);

  return accessToken; // Provide the access token to other components
};

export default useToken;
