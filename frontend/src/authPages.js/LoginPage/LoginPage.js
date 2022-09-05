import React, { useState, useEffect } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInput from './LoginPageInput';
import LoginPageFooter from './LoginPageFooter';
import { validateLoginForm } from '../../shared/utils/validators';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm(mail, password));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    console.log('login in');
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInput
        mail={mail}
        setMail={setMail}
        passsword={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

export default LoginPage;
