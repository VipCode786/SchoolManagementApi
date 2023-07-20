const jwt = require('jsonwebtoken');

const generateToken = (userToken) => {
  const token = jwt.sign({userToken }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

 const isAuth = (req, res, next) => {
  // console.log("isAuth")
  const authorization = req.headers.authorization;
  // console.log("authorization",authorization)
  if (authorization) {
     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    // const token = authorization
    console.log("token",token)
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          
          req.userToken = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};


const isSuperAdmin = (req, res, next) => {
  if (req.userToken.userToken.isSuperAdminAgent) {
    next(); // User is a superadmin, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

const isVerifyAdmin = (req, res, next) => {
  if (req.userToken.userToken.isVerified) {
    next(); // User is a superadmin, proceed to the next middleware
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
 module.exports = { generateToken, isSuperAdmin, isAuth};
