const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorHeader = req.header("Authorization");
  const token = authorHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Token available" });
  }
};

module.exports = verifyToken;
