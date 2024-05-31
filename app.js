var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const nodemailer = require("nodemailer");
const cron = require("node-cron");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const transporter = require("./nodemail");

var app = express();

// MongoDB connection string
const mongoURI =
  "mongodb+srv://pradeepstha14:Dmj2DPVsnYP9Of87@clusterpradeep1.vfa7wr9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPradeep1";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Schedule email notifications for all events at server startup
// const Event = require("./models/event");
// Event.find().then((events) => {
//   events.forEach((event) => {
//     scheduleEmailNotification(event);
//   });
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/items", require("./routes/items"));
app.use("/api/holidays", require("./routes/holidays"));
app.use("/api/events", require("./routes/events"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
