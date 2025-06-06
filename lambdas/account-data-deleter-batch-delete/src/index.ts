import { config } from './config.ts';
import * as Sentry from '@sentry/aws-serverless';
import { serverLogger } from '@pocket-tools/ts-logger';

//Init needs to come first.
Sentry.init({
  dsn: config.sentry.dsn,
  release: config.sentry.release,
  environment: config.app.environment,
  serverName: config.app.name,
});

import { EventBridgeEvent } from 'aws-lambda';
import { BatchDeleteDyanmoClient } from './dynamoUtils.ts';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { deleteUserMutationCaller } from './externalCaller/deleteMutation.ts';

const dynamoDBClient = new DynamoDBClient({
  region: config.aws.region,
  endpoint: config.aws.endpoint,
});

/**
 * function to fetch max batch size of userId from pendingTable in dynamo and call deleteMutation
 * for each userId.
 * Move the successfully deleted userIds to ProcessedTable in dynamo
 * If we fail to delete userId, we log in sentry and move on to next userId.
 * Failed deletion would stay in pendingTable and can be considered for the next batch.
 * @param dynamoUtils
 */
export async function deleteUsers(dynamoUtils: BatchDeleteDyanmoClient) {
  const userIds: number[] = await dynamoUtils.getBatch(
    config.dynamo.maxBatchSize,
  );
  const deletedUserIds: number[] = [];
  for (const userId of userIds) {
    try {
      const deletedId = await deleteUserMutationCaller(userId.toString());
      deletedUserIds.push(parseInt(deletedId));
    } catch {
      Sentry.captureException({ message: `unable to delete userId ${userId}` });
      serverLogger.error(`unable to delete userId ${userId}`);
    }
  }
  await dynamoUtils.moveBatch(deletedUserIds);
  return deletedUserIds;
}

/**
 * lambda handler function. gets triggered with cloudwatch event
 * @param event scheduled event that triggers the lambda
 */

export async function handlerFn(
  event: EventBridgeEvent<any, any>,
): Promise<any> {
  serverLogger.info(`received cloudwatch event, ${JSON.stringify(event)}`);
  validateEvent(event);
  const dynamoUtils = new BatchDeleteDyanmoClient(dynamoDBClient);
  return await deleteUsers(dynamoUtils);
}

function validateEvent(event: EventBridgeEvent<any, any>) {
  if (
    event['detail-type'] !== 'Scheduled Event' ||
    event['source'] !== 'aws.events'
  ) {
    throw new Error(`unknown trigger ${event}`);
  }
}

export const handler = Sentry.wrapHandler(handlerFn);
