import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authCustomerMiddleware: RequestHandler = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
