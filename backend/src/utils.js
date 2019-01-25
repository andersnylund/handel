import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

export const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

export const options = {
  audience: process.env.AUTHO_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};

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

export default { client, getKey, options, getMe, toCursorHash, fromCursorHash };
