import { Router } from 'express';
import axios from 'axios';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const results = await axios.get('https://jsonplaceholder.typicode.com/users');

  return response.json(results.data);
});

usersRouter.post('/', async (request, response) => {
  return response.json({ message: 'hellow world' });
});

export default usersRouter;
