const listPassAuthenticate = ["/user/signup", "/user/signIn", "/uploads"];
const authenticateToken = (req, res, next) => {
  console.log("request");
  if (listPassAuthenticate.includes(req.path)) {
    return next();
  }
  //   if (true) return res.status(401).send(payload.createResponseAuthenticate({}));
  return next();
};

module.exports = authenticateToken;
