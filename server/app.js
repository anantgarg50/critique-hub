const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const historyApiFallback = require("connect-history-api-fallback");

require("./database/connection");

const app = express();

app.use(logger("dev"));
app.use(historyApiFallback());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
