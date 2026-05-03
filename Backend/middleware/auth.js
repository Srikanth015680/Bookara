import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    // 1. Check token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login"
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user id to request
    req.userId = decoded.id;

    // 4. Continue
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token"
    });
  }
};

export default authUser;