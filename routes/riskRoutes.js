const express = require("express");
const router = express.Router();

const DailyCheckin = require("../models/DailyCheckin");


const ensureAuth = require("../middleware/ensureAuth");

/**
 * =========================
 * GET: Risk Status API
 * URL: /api/risk-status
 * =========================
 */
router.get("/risk-status", ensureAuth, async (req, res) => {
  try {
    // Passport guarantee
    const userId = req.user._id;

    // Fetch last 3 check-ins
    const last3 = await DailyCheckin.find({ userId })
      .sort({ date: -1 })
      .limit(3);

    // Not enough data
    if (last3.length < 3) {
      return res.json({ risk: "LOW" });
    }

    // Risk rules
    const anxietyHigh = last3.every(d => d.anxiety >= 7);
    const stressHigh  = last3.every(d => d.stress >= 7);
    const sleepLow    = last3.every(d => d.sleepHours < 5);

    if (anxietyHigh || stressHigh || sleepLow) {
      return res.json({
        risk: "HIGH",
        message:
          "We noticed signs of ongoing stress. Please consider using Crisis Support.",
      });
    }

    return res.json({ risk: "LOW" });

  } catch (err) {
    console.error("🔥 RISK ROUTE ERROR:", err);

    return res.status(500).json({
      risk: "UNKNOWN",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
