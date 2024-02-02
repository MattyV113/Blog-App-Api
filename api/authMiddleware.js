import jwt from 'jsonwebtoken';
const { verify } = jwt;
import dotenv from 'dotenv';
dotenv.config({ path: '/Users/mattyv113/Desktop/Blog-App/api/.env' });
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = verify(token, process.env.MY_JWT_KEY);
    console.log(req.user);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie('token');
    res.redirect('http://localhost:5174/');
  }
};
