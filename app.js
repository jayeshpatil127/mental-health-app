// ================== LOAD ENV FIRST ==================
require("dotenv").config();

// ================== CORE IMPORTS ==================
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// ================== APP INIT ==================
const app = express();

// ================== VIEW ENGINE ==================
app.set("view engine", "ejs");
app.set("layout", "layout");
app.use(expressLayouts);

// ================== MIDDLEWARES ==================
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ================== DATABASE ==================


mongoose
  .connect(process.env.ATLASDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ================== SESSION + AUTH ==================
app.use(
  session({
    secret: "hackathonSecret",
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
  res.locals.title = "MindWell - Digital Mental Health Support";
  next();
});


// ================== GLOBAL LOCALS ==================
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  res.locals.user = req.user || null;
  next();
});

// ================== ROUTES ==================
app.use("/checkin", require("./routes/DailyCheckin"));
app.use("/api", require("./routes/riskRoutes"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/profile"));




app.use("/chat", require("./routes/chatRoutes"));


app.use("/quiz", require("./routes/quiz"));

app.use("/admin", require("./routes/admin"));

app.use("/", require("./routes/auth"));

app.use("/mood-tracker", require("./routes/moodRoutes"));
app.use("/", require("./routes/resources"));
app.use("/", require("./routes/crisis"));

// ================== ROOT ==================
app.get("/", (req, res) => {
  res.render("login", { title: "MindWell Login" });
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${PORT}`)
);
