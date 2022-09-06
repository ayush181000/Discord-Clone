import React from 'react';
import { styled } from '@mui/system';
import FriendsListItem from "./FriendsListItem";

const DUMMY_FRIEND_LIST = [
  {
    id: 1,
    username: 'Mark',
    isOnline: true,
  },
  {
    id: 2,
    username: 'Anna',
    isOnline: false,
  },
  {
    id: 3,
    username: 'John',
    isOnline: false,
  },
];

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});

const FriendsList = () => {
  return (
    <MainContainer>
      {DUMMY_FRIEND_LIST.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;
