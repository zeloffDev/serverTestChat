const payload = require("./payload/payload");

const listPassAuthenticate = ["/user/signup", "/user/signIn", "/uploads"];
const authenticateToken = (req, res, next) => {
  if (listPassAuthenticate.includes(req.path)) {
    return next();
  }
  //   if (true) return res.status(401).send(payload.createResponseAuthenticate({}));
  return next();
};

module.exports = authenticateToken;
