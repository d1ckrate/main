// authMiddleware.js
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Authentication failed" });
  }
}
