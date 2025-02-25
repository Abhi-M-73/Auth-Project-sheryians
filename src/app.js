const express = require('express');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");


app.use("/users", userRoute);
app.use("/post", postRoute);


module.exports = app;
