import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const CloseRoomButton = () => {
  const handleLeaveRoom = () => {};

  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: 'white' }}>
      <Close />
    </IconButton>
  );
};

export default CloseRoomButton;
