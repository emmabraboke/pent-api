import { Router } from 'express';
import passport from 'passport';

import {
  signIn,
  signUp,
  googleSign,
  forgotPassword,
  resetPassword,
  logOut,
  changePassword,
} from '../controllers/auth.js';

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

import {
  authentication,
  authorization,
} from '../middlewares/authentication.js';

const route = Router();

route.post('/signUp', signUp);
route.post(
  '/signIn',
  passport.authenticate('local', { successMessage: 'login' }),
  signIn
);

route.post('/forgotPassword', forgotPassword);
route.post('/reset', resetPassword);
route.post('/password', authentication, changePassword);
route.get('/logOut', logOut);

route.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

route.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleSign
);

route.get('/', authentication, getUsers);
route.get('/:id', authentication, getUser);
route.patch('/:id', authentication, updateUser);
route.delete('/:id', authentication, deleteUser);

export default route;
