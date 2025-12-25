const express = require("express");
const passport = require("passport");
const router = express.Router();

// Admin login page
router.get("/login", (req, res) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return res.redirect("/admin/dashboard");
  }
  res.render("adminLogin", { title: "Admin Login" });
});

// Admin login POST
router.post(
  "/login",
  passport.authenticate("admin-local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
  })
);

// Admin dashboard
router.get("/dashboard", ensureAdmin, (req, res) => {
  res.render("adminDashboard", {
    title: "Admin Dashboard",
    admin: req.user,
  });
});

// Middleware
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  return res.redirect("/admin/login");
}

module.exports = router;
