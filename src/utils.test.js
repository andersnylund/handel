import { getMe } from './utils';

describe('index.js', () => {
  describe('getMe()', () => {
    it('should throw AuthenticatioError if token invalid', async () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer test',
        },
      };
      try {
        await getMe(mockRequest);
      } catch (e) {
        expect(e.message).toBe('jwt malformed');
      }
    });

    it('should return null if authorization header not set', async () => {
      const mockRequest = {
        headers: {
          somethingElse: 'Bearer',
        },
      };
      const result = await getMe(mockRequest);
      expect(result).toBeNull();
    });
  });
});
