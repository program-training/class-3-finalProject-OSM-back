import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: 'Too many login attempts. Please try again later.',
});

export default limiter;
