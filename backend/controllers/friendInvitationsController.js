import User from '../models/User.js';

const postInvite = async (req, res) => {
  try {
    const { targetMailAddress } = req.body;
    return res.send('controller is working');
  } catch (error) {
    return res.status(500).send('Error occured. Please try again');
  }
};
export { postInvite };
