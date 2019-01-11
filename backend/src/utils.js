import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export const getMe = async req => {
  const token = req.headers.authorization;

  if (token) {
    const parsed = token.replace('Bearer ', '');
    if (parsed !== 'undefined') {
      try {
        const result = await jwt.verify(parsed, process.env.SECRET);
        return result;
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    }
  }

  return null;
};

export default { getMe };
