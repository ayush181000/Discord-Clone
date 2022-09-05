import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
      const token = generateToken(user._id, mail);

      return res.status(200).send({
        userDetails: {
          mail: user.mail,
          token,
          username: user.username,
        },
      });
    }

    return res.status(400).send('Invalid credentials. Please try again');
  } catch (error) {
    return res.status(500).send('Error occured. Please try again');
  }
};

const register = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });
    if (userExists) return res.status(409).send('User already exists');

    // encrypt password
    const encryptPass = await bcrypt.hash(password, 10);

    // create user document and save in dataabse
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptPass,
    });

    // create JWT token
    const token = generateToken(user._id, mail);

    // send response
    return res.status(201).send({
      userDetails: {
        mail: user.mail,
        token,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).send('Error occured. Please try again');
  }
};

export { login, register };
