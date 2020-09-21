import { Router } from 'express';
import axios from 'axios';
import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.get('/download', async (request, response) => {
  const results = await axios.get('https://jsonplaceholder.typicode.com/users');

  return response.json(results.data);
});

usersRouter.get('/save', async (request, response) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  const createUsers = new CreateUsersService();

  const results = createUsers.execute(data);

  return response.json(results);
});

export default usersRouter;
