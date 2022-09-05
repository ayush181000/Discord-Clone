import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const getFormNotValidMessage = () => {
  return 'Username should contain between 3 and 12 characters and password shoud contains between 6 and 12 characters';
};

const getFormValidMessage = () => {
  return 'Press to register! ';
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  let navigate = useNavigate();
  const handlePushToLoginPage = () => {
    navigate('/login');
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
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text='Already have an account ?'
        redirectText={'Login'}
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
