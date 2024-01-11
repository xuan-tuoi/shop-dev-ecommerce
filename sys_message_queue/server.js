'use strict';
const {
  consumerToQueue,
  consumerToQueueNormal,
  consumerToQueueFailed,
} = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';

// consumerToQueue(queueName)
//   .then(() => {
//     console.log(`Consumer queue ${queueName} successfully!`);
//   })
//   .catch((error) => {
//     console.log(`Consumer queue ${queueName} failed!`);
//     console.log(error);
//   });

consumerToQueueNormal(queueName)
  .then(() => {
    console.log(`consumerToQueueNormal start!`);
  })
  .catch((error) => {
    console.log(`consumerToQueueNormal failed!`);
    console.log(error);
  });

consumerToQueueFailed(queueName)
  .then(() => {
    console.log(`consumerToQueueFailed start!`);
  })
  .catch((error) => {
    console.log(`consumerToQueueFailed failed!`);
    console.log(error);
  });
