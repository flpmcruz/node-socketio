export const isLoggedIn = (req, res, next) => {
  if (req.cookies.username) {
    return next();
  }

  res.redirect("/register");
};
