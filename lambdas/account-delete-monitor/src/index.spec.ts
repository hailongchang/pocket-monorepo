import { Event, handlers } from './handlers/index.ts';
import { processor } from './index.ts';
import { type SQSEvent } from 'aws-lambda';
import * as Sentry from '@sentry/aws-serverless';

describe('event handlers', () => {
  let deleteStub: jest.SpyInstance;
  let sentryStub: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    sentryStub = jest.spyOn(Sentry, 'captureException');
  });
  afterAll(() => jest.restoreAllMocks());
  describe('with no handler errors', () => {
    beforeEach(() => {
      deleteStub = jest
        .spyOn(handlers, Event.ACCOUNT_DELETION)
        .mockResolvedValue();
    });
    it('routes to the correct handler function based on detail-type', async () => {
      const records = {
        Records: [
          {
            body: JSON.stringify({
              Message: JSON.stringify({
                'detail-type': Event.ACCOUNT_DELETION,
              }),
            }),
          },
        ],
      };
      await processor(records as SQSEvent);
      expect(deleteStub).toHaveBeenCalledTimes(1);
      expect(deleteStub).toHaveBeenCalledWith(records.Records[0]);
    });
    it('returns empty array and logs if handler does not exist', async () => {
      const records = {
        Records: [
          {
            body: JSON.stringify({
              Message: JSON.stringify({ 'detail-type': 'NOT_A_TYPE' }),
            }),
            messageId: 'abc',
          },
        ],
      };
      const res = await processor(records as SQSEvent);
      expect(res.batchItemFailures).toEqual([]);
    });
  });
  describe('with handler errors', () => {
    beforeEach(() => {
      deleteStub = jest
        .spyOn(handlers, Event.ACCOUNT_DELETION)
        .mockImplementation(() => Promise.reject(new Error('got an error')));
    });
    it('returns batchItemFailure and logs to Sentry if handler throws error', async () => {
      const records = {
        Records: [
          {
            body: JSON.stringify({
              Message: JSON.stringify({
                'detail-type': Event.ACCOUNT_DELETION,
              }),
            }),
            messageId: 'abc',
          },
        ],
      };
      const res = await processor(records as SQSEvent);
      expect(res.batchItemFailures).toEqual([{ itemIdentifier: 'abc' }]);
      expect(sentryStub).toHaveBeenCalledTimes(1);
      expect(sentryStub.mock.calls[0][0].message).toEqual('got an error');
    });
  });
});
