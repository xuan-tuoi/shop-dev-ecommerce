'use strict';

const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:xuantuoi01@localhost');
    if (!connection) throw new Error('No connection');

    const channel = await connection.createChannel();
    return {
      connection,
      channel,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    const queue = 'test_queue';
    const message = 'Hello, Xuan Tuoi!';

    await channel.assertQueue(queue);

    await channel.sendToQueue(queue, Buffer.from(message)); // Sử dụng Buffer để chuyển đổi chuỗi thành dạng byte cho đỡ tốn băng thông.

    // close the connection
    await connection.close();
  } catch (error) {
    throw new Error(error);
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, {
      durable: true, // durable: true để RabbitMQ lưu lại nếu RabbitMQ bị tắt.
    });
    console.log('waiting for messages ...');

    channel.consume(
      queueName,
      (msg) => {
        console.log('received message--------->', msg.content.toString());
        //1. Find user following that SHOP
        //2. Send message to user
        //3. yes, ok ===> success
        //4. error, setup DLX (dead letter exchange)
      },
      {
        noAck: true, // noAck: true để RabbitMQ tự động xác nhận khi nhận được message. Nếu tin nhắn đã gửi rồi thì không gửi lại nữa.
      }
    );
  } catch (error) {
    console.log('error consumerQueue--->', error);
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQForTest,
  consumerQueue,
};
