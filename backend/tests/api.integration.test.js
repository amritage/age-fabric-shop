const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.mock('../config/email', () => ({
  sendEmail: (_body, res, message) => res.status(200).send({ message }),
}));

let app;
let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  process.env.TOKEN_SECRET = 'testsecret';
  process.env.JWT_SECRET_FOR_VERIFY = 'verifysecret';
  process.env.EMAIL_USER = 'test@example.com';
  process.env.EMAIL_PASS = 'pass';
  process.env.SERVICE = 'test';
  process.env.HOST = 'localhost';
  process.env.EMAIL_PORT = '465';
  app = require('../index');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

afterEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collection of collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
});

describe('Authentication flow', () => {
  it('should sign up and login a user', async () => {
    const signupRes = await request(app)
      .post('/api/user/signup')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });
    expect(signupRes.statusCode).toBe(200);

    const User = require('../model/User');
    const user = await User.findOne({ email: 'test@example.com' });
    user.status = 'active';
    await user.save();

    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com', password: '123456' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.data.token).toBeDefined();
  });
});

describe('Product creation', () => {
  it('should create a product', async () => {
    const Brand = require('../model/Brand');
    const Category = require('../model/Category');
    const brand = await Brand.create({ name: 'Acme', email: 'b@example.com' });
    const category = await Category.create({ parent: 'Cat', productType: 'type' });

    const productData = {
      img: 'http://example.com/img.png',
      title: 'Prod',
      unit: 'pc',
      imageURLs: [],
      parent: 'Cat',
      price: 100,
      quantity: 10,
      brand: { name: brand.name, id: brand._id },
      category: { name: category.parent, id: category._id },
      status: 'in-stock',
      productType: 'type',
      description: 'desc',
    };

    const res = await request(app).post('/api/product/add').send(productData);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Prod');
  });
});

describe('Order workflow', () => {
  it('should create an order', async () => {
    const User = require('../model/User');
    const user = await User.create({
      name: 'OrderUser',
      email: 'order@example.com',
      password: '123456',
      status: 'active',
    });

    const orderData = {
      user: user._id,
      cart: [],
      name: 'OrderUser',
      address: 'addr',
      email: 'order@example.com',
      contact: '123',
      city: 'City',
      country: 'Country',
      zipCode: '111',
      subTotal: 100,
      shippingCost: 0,
      discount: 0,
      totalAmount: 100,
      paymentMethod: 'cod',
      status: 'pending',
    };

    const res = await request(app).post('/api/order/saveOrder').send(orderData);
    expect(res.statusCode).toBe(200);
    expect(res.body.order).toBeDefined();
  });
});

