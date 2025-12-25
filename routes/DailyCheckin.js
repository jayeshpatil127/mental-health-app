const express = require("express");
const router = express.Router();

// ...existing code...
const DailyCheckin = require("../models/DailyCheckin");
// ...existing code...

const ensureAuth = require("../middleware/ensureAuth");

/**
 * =========================
 * GET: Render Daily Check-In Page
 * =========================
 */
router.get("/", ensureAuth, (req, res) => {
  res.render("checkin");
});

/**
 * =========================
 * POST: Save / Update Today’s Check-In
 * =========================
 */
router.post("/", ensureAuth, async (req, res) => {
  try {
    const { mood, anxiety, stress, sleepHours, note } = req.body;

    if ([mood, anxiety, stress, sleepHours].some(v => v === undefined)) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkin = await DailyCheckin.findOneAndUpdate(
      {
        userId: req.user._id,   // ✅ THIS WAS THE MAIN BUG EARLIER
        date: today,
      },
      {
        $set: {
          mood: Number(mood),
          anxiety: Number(anxiety),
          stress: Number(stress),
          sleepHours: Number(sleepHours),
          note: note || "",
          date: today,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return res.json({ success: true, checkin });

  } catch (err) {
    console.error("🔥 DAILY CHECKIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

/**
 * =========================
 * GET: Last 7 Days Check-Ins
 * =========================
 */
router.get("/recent", ensureAuth, async (req, res) => {
  try {
    const data = await DailyCheckin.find({
      userId: req.user._id,
    })
      .sort({ date: -1 })
      .limit(7);

    return res.json(data);

  } catch (err) {
    console.error("🔥 RECENT CHECKIN ERROR:", err);
    return res.status(500).json([]);
  }
});

/**
 * =========================
 * GET: View Check-in History Page (FRONTEND)
 * =========================
  */
// /checkin
router.get("/", ensureAuth, (req, res) => {
  res.render("checkin", { title: "Daily Check-In" });
});

// /checkin/history
router.get("/history", ensureAuth, async (req, res) => {
  const checkins = await DailyCheckin.find({
    userId: req.user._id
  }).sort({ date: -1 });

  res.render("checkin-history", {
    title: "My Check-Ins",
    checkins
  });
});

module.exports = router;

