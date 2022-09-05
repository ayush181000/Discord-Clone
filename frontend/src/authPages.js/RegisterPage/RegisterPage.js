import React, { useState } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInput from './RegisterPageInput';

const RegisterPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <AuthBox>
      <Typography variant='h5' sx={{ color: 'white' }}>
        Create an account
      </Typography>
      <RegisterPageInput
        mail={mail}
        setMail={setMail}
        passsword={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
      />
    </AuthBox>
  );
};

export default RegisterPage;
