import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const getFormNotValidMessage = () => {
  return 'Enter correct e-mail address and password shoud contains between 6 and 12 characters';
};

const getFormValidMessage = () => {
  return 'Press to log in! ';
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  let navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate('/register');
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label='Log in'
            additionalSytles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text='Need and account?'
        redirectText={'Create an account'}
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
