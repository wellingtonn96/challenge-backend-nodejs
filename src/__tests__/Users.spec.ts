import request from 'supertest';
import { Connection, getConnection, getRepository } from 'typeorm';
import createConnection from '../database';

import User from '../models/User';

import app from '../app';
import Company from '../models/Company';
import Contact from '../models/Contact';
import Address from '../models/Address';

let connection: Connection;

describe('Users', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.runMigrations();
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.undoLastMigration();
    await connection.undoLastMigration();
    await connection.undoLastMigration();
    await connection.undoLastMigration();
    await connection.undoLastMigration();
    await connection.undoLastMigration();
    await connection.undoLastMigration();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list users of api', async () => {
    const response = await request(app).get('/users/download');

    expect(response.body.length === 10).toBeTruthy();
  });

  it('should be able to create users of api in the database', async () => {
    const userRepository = getRepository(User);
    const compainesRepository = getRepository(Company);
    const contactsRepository = getRepository(Contact);
    const addressRepository = getRepository(Address);

    await request(app).get('/users/save');

    const users = await userRepository.findOne();
    const companies = await compainesRepository.findOne();
    const contacts = await contactsRepository.findOne();
    const address = await addressRepository.findOne();

    expect(users).toBeTruthy();
    expect(companies).toBeTruthy();
    expect(contacts).toBeTruthy();
    expect(address).toBeTruthy();
  });

  it('should not be able to create user users staying in apartments', async () => {
    const addressRepository = getRepository(Address);

    await request(app).get('/users/save');

    const address = await addressRepository.find();
    const results = address.map(item => item.suite.includes('Apt.'));

    expect(results).not.toContain(true);
  });
});
