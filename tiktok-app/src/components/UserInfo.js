import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/global.css';
import '../styles/carousel.css';

const UserInfo = ({ accessToken }) => {
  const [userInfo, setUserInfo] = useState({
    avatar_url: '',
    open_id: '',
    union_id: '',
    display_name: 'Loading...',
  });

  useEffect(() => {
    if (accessToken) {
      axios.get('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        const { data } = response.data;
        setUserInfo(data.user);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, [accessToken]);

  return (
    <div className="user-info-container">
      <img src={userInfo.avatar_url} alt="User Avatar" />
      <h2>User Name: {userInfo.display_name}</h2>
      <p>Open ID: {userInfo.open_id}</p>
      <p>Union ID: {userInfo.union_id}</p>
    </div>
  );
};

export default UserInfo;
