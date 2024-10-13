import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "123", (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send("refuses to authorize");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("Unauthozied");
  }
};

export default jwtMiddleware;
