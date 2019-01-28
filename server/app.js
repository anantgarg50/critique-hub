const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const historyApiFallback = require("connect-history-api-fallback");

require("./database/connection");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(require("cors")());
}

app.use(logger("dev"));
app.use(compression());
app.use(historyApiFallback());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes");
// const commonRoutes = require("./routes/common");
const adminRoutes = require("./routes/admin");
// const userRoutes = require("./routes/user");
// const communityRoutes = require("./routes/community");

app.use("/", indexRouter);
app.use("/admin", adminRoutes);

module.exports = app;
