import jwt from 'jsonwebtoken';

const generateToken = (userId, mail) => {
  return jwt.sign({ userId, mail }, process.env.TOKEN_KEY, {
    expiresIn: '30d',
  });
};

export default generateToken;
