'use strict';

const { resolveSingleParamResolver } = require('../resolvers');

const mockNext = jest.fn();

afterEach(() => {
  mockNext.mockReset();
});

describe('resolveSingleParamResolver', () => {
  const baseMockCtx = {
    dataSources: {
      db: {
        User: {},
      },
    },
  };

  test('Throws error when model cannot be found', async () => {
    await expect(resolveSingleParamResolver('notAModelName')(mockNext)(null, {}, baseMockCtx))
      .rejects.toThrow('Could not find model \'notAModelName\'');
    expect(mockNext).not.toHaveBeenCalled();
  });
});
