import Review from '../database/models/Review.js';
import jwt from 'jsonwebtoken';
import config from '../../config/default.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

export const createReview = async (req, res) => {
  const review = await Review.create({ ...req.body });
  res.status(200).json(review);
};

export const getReviews = async (req, res) => {
  let { sort } = req.query;

  if (sort === 'recent') {
    sort = '-createdAt';
  } else if (sort === 'helpful') {
    sort = '-helpful';
  }

  const reviews = await Review.find({}).sort(sort);
  res.status(200).json(reviews);
};

export const getReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`no item with id ${reviewId} `);
  }

  res.status(200).json(review);
};

export const getUserReviews = async (req, res) => {
  let { sort } = req.query;

  if (sort === 'recent') {
    sort = '-createdAt';
  } else if (sort === 'helpful') {
    sort = '-helpful';
  }
  const reviews = await Review.find({ reviewer: req.user.id }).sort(sort);
  res.status(200).json(reviews);
};

export const isHelpful = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });
  const cookie = req.cookies.reviews;

  if (!review) {
    throw new NotFoundError(`no item with id ${reviewId} `);
  }

  if (cookie) {
    return res.status(200).json('You have voted already');
  }
  //if the guest have not voted
  review.helpful += 1;
  await review.save();

  const voted = true;
  const token = jwt.sign({ voted }, config.tokenSecret);

  // cookie is saved in the browser to validate the guest the next they try to vote
  res.cookie('reviews', token);

  res.status(200).json("voted! it's helpful");
};

export const notHelpful = async (req, res) => {
  /* This removes the user vote, if the user have voted
     for it's helpful
     */
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`no item with id ${reviewId} `);
  }

  const cookie = req.cookies.reviews;

  if (cookie) {
    try {
      //checks if the user has voted
      const verify = jwt.verify(cookie, config.tokenSecret);

      if (verify) {
        review.helpful -= 1;
        await review.save();
      }

      //After removing the vote the cookie is deleted
      res.clearCookie('reviews');
      return res.status(200).json('vote removed');
    } catch (error) {
      throw new BadRequestError(error);
    }
  }

  res.status(200).json('You have not voted');
};

export const updateReview = async (req, res) => {
  const { comment, apartment } = req.body;
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`no item with id ${reviewId} `);
  }

  if (comment) {
    review.comment = comment;
  }

  if (apartment) {
    review.apartment = apartment;
  }

  await review.save();

  res.status(200).json(review);
};

export const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`no item with id ${reviewId} `);
  }

  await review.remove();
  res.status(200).json('review deleted');
};
