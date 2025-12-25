const express = require("express");
const router = express.Router();
const DailyCheckin = require("../models/DailyCheckin");
const ensureAuth = require("../middleware/ensureAuth");

router.get("/dashboard", ensureAuth, async (req, res) => {
  const userId = req.user._id;

  // Today date (normalized)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Last 7 days check-ins
  const last7 = await DailyCheckin.find({ userId })
    .sort({ date: -1 })
    .limit(7);

  // Today check-in
  const todayCheckin = last7.find(c =>
    new Date(c.date).getTime() === today.getTime()
  );

  // Weekly average mood
  const avgMood = last7.length
    ? (
        last7.reduce((sum, c) => sum + c.mood, 0) / last7.length
      ).toFixed(1)
    : null;

  // Streak calculation
  let streak = 0;
  for (let i = 0; i < last7.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(last7[i - 1].date);
      const curr = new Date(last7[i].date);
      const diff = (prev - curr) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
  }

  res.render("dashboard", {
    title: "Dashboard",
    user: req.user,
    todayMood: todayCheckin ? todayCheckin.mood : null,
    avgMood,
    streak,
    chartData: last7.reverse()
  });
});

module.exports = router;
