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
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};

export const toCursorHash = string =>
  Buffer.from(JSON.stringify(string)).toString('base64');

export const fromCursorHash = string =>
  JSON.parse(Buffer.from(string, 'base64').toString('utf-8'));

export default { getKey, options, toCursorHash, fromCursorHash };
