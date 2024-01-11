'use strict';

const mongoose = require('mongoose');

const connectString = 'mongodb://127.0.0.1:27017/tipjs-ecommerce';

const TestSchema = new mongoose.Schema({
  name: String,
});

const Test = mongoose.model('Test', TestSchema);

describe('MongoDB', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('should connect to MongoDB', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should save a document to the DB', async () => {
    const user = new Test({
      name: 'Xuan Tuoi',
    });
    await user.save();
    expect(user.isNew).toBe(false);
  });

  it('should find a document from the DB', async () => {
    const user = await Test.findOne({ name: 'Xuan Tuoi' });
    expect(user).toBeDefined(); // expect là một hàm của Jest để kiểm tra kết quả mong muốn. Nếu kết quả mong muốn không đúng thì Jest sẽ báo lỗi. expect(user).toBeDefined() có nghĩa là mong muốn user là một giá trị được định nghĩa.
    expect(user.name).toBe('Xuan Tuoi');
  });
});
