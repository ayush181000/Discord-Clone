import React from 'react';
import { styled } from '@mui/system';

const MainContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  backgroundColor: '#36393f',
  marginTop: '48px',
});

const Messenger = () => {
  return <MainContainer>Messenger</MainContainer>;
};

export default Messenger;
