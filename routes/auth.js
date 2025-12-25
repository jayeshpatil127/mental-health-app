const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();


router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    error: null, 
  });
});


router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.render("register", {
      title: "Register",
      error: "All fields are required",
    });
  }

  try {
    await User.create({
      email: email.toLowerCase().trim(),
      password,          
      role: "user",
    });

    // Success → login
    return res.redirect("/login");

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // Duplicate email (Mongo)
    if (err.code === 11000) {
      return res.render("register", {
        title: "Register",
        error: "Email already registered. Please login.",
      });
    }

    return res.render("register", {
      title: "Register",
      error: "Something went wrong. Please try again.",
    });
  }
});


router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    error: null,
  });
});


router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Role-based redirect
    if (req.user && req.user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    return res.redirect("/dashboard");
  }
);


router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
});

module.exports = router;
