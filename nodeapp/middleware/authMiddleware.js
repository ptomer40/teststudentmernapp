const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Hi inside authorization");
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    console.log(req.user)

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
