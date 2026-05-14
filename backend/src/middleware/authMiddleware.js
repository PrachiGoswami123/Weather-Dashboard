const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  // 1. Check token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  // 2. Handle "Bearer TOKEN"
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user to request
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;