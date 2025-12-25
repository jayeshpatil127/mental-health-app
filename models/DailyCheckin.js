const mongoose = require("mongoose");

const dailyCheckinSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: { type: Number, min: 1, max: 10, required: true },
    anxiety: { type: Number, min: 1, max: 10, required: true },
    stress: { type: Number, min: 1, max: 10, required: true },
    sleepHours: { type: Number, min: 0, max: 24, required: true },
    note: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🔒 THIS PREVENTS OVERWRITE ERROR
module.exports =
  mongoose.models.DailyCheckin ||
  mongoose.model("DailyCheckin", dailyCheckinSchema);
