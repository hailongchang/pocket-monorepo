import { SQSClient } from '@aws-sdk/client-sqs';
import { config } from './config.ts';

export const client = new SQSClient({
  endpoint: config.aws.sqs.endpoint,
  region: config.aws.region,
});
