import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const generateToken = (secret, { id, username, email }) =>
  jwt.sign({ id, username, email }, secret, { expiresIn: '30m' });

export default {
  Query: {
    me: async (parent, args, { me }) => {
      if (!me) {
        throw new AuthenticationError('Login not valid');
      } else {
        return {
          id: me.id,
          username: me.username,
          email: me.email,
        };
      }
    },
  },
  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models: { User }, secret }
    ) => {
      const user = await User.create({ username, email, password });
      const token = generateToken(secret, user);
      return {
        token,
      };
    },
    signIn: async (
      parent,
      { login, password },
      { models: { User }, secret }
    ) => {
      const user = await User.findByLogin(login);
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      return { token: generateToken(secret, user) };
    },
  },
};
