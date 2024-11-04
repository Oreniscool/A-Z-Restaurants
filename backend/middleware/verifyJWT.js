import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(400).send('Token is needed');
  } else {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ auth: false, message: 'Token is invalid' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

export default verifyJWT;
