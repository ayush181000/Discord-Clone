import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Videocam, VideocamOff } from '@mui/icons-material';

const CameraButton = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton onClick={handleToggleCamera} style={{ color: 'white' }}>
      {cameraEnabled ? <Videocam /> : <VideocamOff />}
    </IconButton>
  );
};

export default CameraButton;
