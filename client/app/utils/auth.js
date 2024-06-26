
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
