'use strict';

const { connectToRabbitMQForTest } = require('../db/init.rabbit');

describe('RabbitMQ', () => {
  it('should connect to RabbitMQ', async () => {
    const result = await connectToRabbitMQForTest();
    expect(result).toBeUndefined();
  });
});
