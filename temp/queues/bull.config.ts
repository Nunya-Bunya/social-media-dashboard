import { BullModuleOptions } from '@nestjs/bull';

export const videoRenderQueueConfig: BullModuleOptions = {
  name: 'videoRenderQueue',
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
};

export const printExportQueueConfig: BullModuleOptions = {
  name: 'printExportQueue',
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
};

export const publishQueueConfig: BullModuleOptions = {
  name: 'publishQueue',
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 200,
    removeOnFail: 100,
  },
};
