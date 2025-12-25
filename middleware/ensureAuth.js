module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  // API calls → JSON error
  if (req.originalUrl.startsWith("/api")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  // Page request → redirect
  res.redirect("/login");
};
