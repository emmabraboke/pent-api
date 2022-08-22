import { Router } from 'express';

import {
  createReview,
  getReviews,
  getReview,
  getUserReviews,
  updateReview,
  isHelpful,
  notHelpful,
  deleteReview,
} from '../controllers/review.js';

import {
  authentication,
  authorization,
} from '../middlewares/authentication.js';

const route = Router();

route.get('/', getReviews);
route.get('/user', authentication, getUserReviews);
route.get('/:id', getReview);
route.post('/', createReview);
route.patch('/isHelpful/:id', isHelpful);
route.patch('/notHelpful/:id', notHelpful);
route.patch('/:id', authentication, updateReview);
route.delete('/:id', authentication, deleteReview);

export default route;
