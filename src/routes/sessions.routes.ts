import { request, response, Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface UserRetorno {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

sessionsRouter.post('/', async (request, response) => {
  const {email, password} = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user: userCompleto, token } = await authenticateUserService.execute({
    email,
    password
  });

  const user: UserRetorno = {...userCompleto};

  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  return response.json({ user, token });
});

export default sessionsRouter;
