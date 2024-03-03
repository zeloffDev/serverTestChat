const ADMIN = ["ADMIN"];
const USER = ["USER"];
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req?.role)) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};
module.exports = { authorizeRoles, ADMIN, USER };
