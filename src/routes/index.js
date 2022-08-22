import { Router } from 'express';
import userRoute from './userRoute.js';
import reviewRoute from './reviewRoute.js';
import fileUploadRoute from './fileUploadRoute.js';

const route = Router();

route.use('/user', userRoute);
route.use('/review', reviewRoute);
route.use('/', fileUploadRoute);

export default route;
