"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishQueueConfig = exports.printExportQueueConfig = exports.videoRenderQueueConfig = void 0;
exports.videoRenderQueueConfig = {
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
exports.printExportQueueConfig = {
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
exports.publishQueueConfig = {
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
//# sourceMappingURL=bull.config.js.map