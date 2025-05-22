  const jwt = require('jsonwebtoken');

  const verifyToken = (req, res, next) => {
      console.log("Hi inside token auth");
    const authHeader = req.headers.authorization;
    console.log("authheader::"+authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
      


    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded::", JSON.stringify(decoded, null, 2));
      req.user = decoded; // Attach user info to request
      console.log("user in auth::", JSON.stringify(req.user.role, null, 2));

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };

  module.exports = verifyToken;
