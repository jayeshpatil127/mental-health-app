const express = require("express");
const router = express.Router();
const ensureAuth = require("../middleware/ensureAuth");

router.get("/resources", ensureAuth, (req, res) => {
  res.render("resources", {
    title: "Resources",
    resources: 
    [
  {
    title: "Managing Anxiety in Daily Life",
    description: "Practical, science-backed strategies to manage anxiety and worry.",
    type: "Article",
    category: "Anxiety",
    duration: "6 min read",
    author: "National Institute of Mental Health (NIMH)",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
  },
  {
    title: "The Science of Better Sleep",
    description: "Learn how sleep works and how to improve sleep quality naturally.",
    type: "Article",
    category: "Sleep",
    duration: "7 min read",
    author: "Sleep Foundation",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    link: "https://www.sleepfoundation.org/how-sleep-works"
  },
  {
    title: "Mindfulness for Stress Reduction",
    description: "How mindfulness can reduce stress and improve mental clarity.",
    type: "Guide",
    category: "Mindfulness",
    duration: "5 min read",
    author: "American Psychological Association",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
    link: "https://www.apa.org/topics/mindfulness/meditation"
  },
  {
    title: "Depression: Symptoms & Treatment",
    description: "Recognize symptoms of depression and learn treatment options.",
    type: "Article",
    category: "Depression",
    duration: "6 min read",
    author: "Mayo Clinic",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
    link: "https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes"
  },
  {
    title: "Coping With Stress",
    description: "Simple coping techniques you can apply in daily life.",
    type: "Guide",
    category: "Stress",
    duration: "5 min read",
    author: "World Health Organization (WHO)",
    image: "https://images.unsplash.com/photo-1500534314209-a26db0f5a1d0",
    link: "https://www.who.int/news-room/questions-and-answers/item/stress"
  },
  {
    title: "Breathing Exercises for Anxiety",
    description: "Guided breathing techniques to calm your nervous system.",
    type: "Video",
    category: "Anxiety",
    duration: "10 min watch",
    author: "NHS UK",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83",
    link: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/"
  }

    ]
  });
});

module.exports = router;
