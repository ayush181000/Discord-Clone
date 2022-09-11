import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';

const MicButton = () => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleToggleMic = () => {
    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton onClick={handleToggleMic} style={{ color: 'white' }}>
      {micEnabled ? <Mic /> : <MicOff />}
    </IconButton>
  );
};

export default MicButton;
