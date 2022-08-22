import { UnauthorizedError } from '../errors/index.js';

const checkPermission = (req, responseId) => {
  if (req.user?.role === 'admin' || req.user?.id === responseId.toString())
    return;

  throw new UnauthorizedError('no permission to access this route');
};

export default checkPermission;
