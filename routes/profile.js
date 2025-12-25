const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.render("profile", {
    title: "My Profile",
    user: req.user
  });
});

module.exports = router;
