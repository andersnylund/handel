import jwt from 'jsonwebtoken';

export const getMe = async req => {
  const token = req.headers.authorization;

  if (token) {
    const parsed = token.replace('Bearer ', '');
    if (parsed !== 'undefined') {
      try {
        const result = await jwt.verify(parsed, process.env.SECRET);
        return result;
      } catch (e) {
        // TODO refactor getMe so that the correct error message is shown to client when needed
        return null;
      }
    }
  }

  return null;
};

export const toCursorHash = string =>
  Buffer.from(JSON.stringify(string)).toString('base64');

export const fromCursorHash = string =>
  JSON.parse(Buffer.from(string, 'base64').toString('utf-8'));

export default { getMe, toCursorHash, fromCursorHash };
