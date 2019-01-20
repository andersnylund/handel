import jwt from 'jsonwebtoken';
import userResolver from './user';

const { me } = userResolver.Query;
const { signUp, signIn } = userResolver.Mutation;

describe('User resolver', () => {
  describe('Query', () => {
    describe('me()', () => {
      it('should throw AuthenticationError if me is undefined', async done => {
        try {
          await me({}, {}, {});
          done.fail('Did not throw error');
        } catch (e) {
          expect(e.message).toBe('Login not valid');
          done();
        }
      });

      it('should return user if me is defined', async () => {
        const result = await me(
          {},
          {},
          {
            me: {
              id: 'id',
              username: 'username',
              email: 'email',
            },
          }
        );
        expect(result).toEqual({
          id: 'id',
          username: 'username',
          email: 'email',
        });
      });
    });
  });

  describe('Mutation', () => {
    describe('signUp()', () => {
      it('should create user and generate token', async () => {
        const user = {
          username: 'test',
          email: 'test@example.com',
          password: 'secretpassword',
        };

        const createdUser = {
          id: 'id',
          username: user.username,
          email: user.email,
        };

        const createUserMock = jest.fn();
        createUserMock.mockReturnValue(createdUser);

        const parent = {};
        const args = { ...user };
        const ctx = {
          models: {
            User: {
              create: createUserMock,
            },
          },
          secret: 'secret',
        };
        const result = await signUp(parent, args, ctx);
        expect(result.token).toBeDefined();
        const isValid = jwt.verify(result.token, ctx.secret);
        expect(isValid).toBeTruthy();
      });
    });

    describe('signIn()', () => {
      it('should throw AuthenticationError if user not found', async done => {
        const user = {
          username: 'test',
          password: 'secretpassword',
        };

        const findByLogin = jest.fn();
        findByLogin.mockReturnValue(null);

        const parent = {};
        const args = { ...user };
        const ctx = {
          models: {
            User: {
              findByLogin,
            },
          },
          secret: 'secret',
        };
        try {
          await signIn(parent, args, ctx);
          done.fail();
        } catch (e) {
          expect(e.message).toBe('Invalid credentials');
          done();
        }
      });

      it('should throw AuthenticationError if password is invalid', async done => {
        const user = {
          username: 'test',
          password: 'secretpassword',
          validatePassword: jest.fn(),
        };

        user.validatePassword.mockReturnValue(false);

        const findByLogin = jest.fn();
        findByLogin.mockReturnValue(user);

        const parent = {};
        const args = { ...user };
        const ctx = {
          models: {
            User: {
              findByLogin,
            },
          },
          secret: 'secret',
        };
        try {
          await signIn(parent, args, ctx);
          done.fail();
        } catch (e) {
          expect(e.message).toBe('Invalid credentials');
          done();
        }
      });

      it('should generate token if login credentials valid', async () => {
        const user = {
          username: 'test',
          password: 'secretpassword',
          validatePassword: jest.fn(),
        };

        user.validatePassword.mockReturnValue(true);

        const findByLogin = jest.fn();
        findByLogin.mockReturnValue(user);

        const parent = {};
        const args = { ...user };
        const ctx = {
          models: {
            User: {
              findByLogin,
            },
          },
          secret: 'secret',
        };
        const result = await signIn(parent, args, ctx);
        expect(result.token).toBeDefined();
        const isValid = jwt.verify(result.token, ctx.secret);
        expect(isValid).toBeTruthy();
      });
    });
  });
});
