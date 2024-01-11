'use strict';

const { connectToRabbitMQ, consumerQueue } = require('../db/init.rabbit');

const messageSevice = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.log('error consumerQueue', error);
      throw new Error(error);
    }
  },

  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notiQueue = 'noti_queue'; // assertQueue

      // -->  1. TTL: lỗi time to live (thời gian sống) của hàng đợi
      // const timeExpire = 15000; // 15s
      // setTimeout(() => {
      //   channel.consume(notiQueue, (msg) => {
      //     console.log(
      //       `SEND notificationQueue successfully with message: ${msg.content.toString()}`
      //     );
      //     channel.ack(msg); // xác nhận đã nhận được message
      //   });
      // }, timeExpire);

      // --> 2. Logic error
      channel.consume(notiQueue, (msg) => {
        try {
          const numberTest = Math.floor(Math.random() * 10); // 0 - 9
          console.log('numberTest--->', numberTest);
          if (numberTest < 7) {
            throw new Error('Send notification failed, Hot fix!');
          }
          console.log('SEND notificationQueue successfully!');
          channel.ack(msg); // xác nhận đã nhận được message
        } catch (error) {
          // console.log('send error consumerToQueueNormal -->', error);
          channel.nack(msg, false, false); // xác nhận chưa nhận được message
        }
      });
    } catch (error) {
      console.log('error consumerToQueueNormal -->', error);
    }
  },

  //case failed to send message to user
  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notificationExchangeDLX = 'notification_exchange_DLX';
      const notificationRoutingKeyDLX = 'notification_routing_key_DLX'; //
      const notiQueueHandler = 'noti_queue_handler_hot_fixed'; // assertQueue

      await channel.assertExchange(notificationExchangeDLX, 'direct', {
        durable: true,
      });

      const queueResult = await channel.assertQueue(notiQueueHandler, {
        exclusive: false, // cho pháp các kết nối khác được truy cập vào cùng một lúc hàng đợi
      });

      await channel.bindQueue(
        queueResult.queue,
        notificationExchangeDLX,
        notificationRoutingKeyDLX
      );

      await channel.consume(
        queueResult.queue,
        (msg) => {
          console.log(
            `this notification error:: Pls Hot fix it: ${msg.content.toString()}`
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.log('error consumerToQueueDLX -->', error);
      throw new Error(error);
    }
  },
};

module.exports = messageSevice;
