import User from '../database/models/User.js';
import { NotFoundError } from '../errors/index.js';
import checkPermission from '../utils/checkPermission.js';

export const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId }).select('-password');

  if (!user) {
    throw new NotFoundError(`no item with id ${userId} `);
  }

  checkPermission(req, user._id);
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const {
    params: { id: userId },
    body,
  } = req;
  const user = await User.findOneAndUpdate({ _id: userId }, body, {
    runValidators: true,
    new: true,
  }).select('-password');

  if (!user) {
    throw new NotFoundError(`no item with id ${userId} `);
  }

  res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`no item with id ${userId} `);
  }
  checkPermission(req, user._id);
  await user.remove();
  res.status(200).json('user deleted');
};
