const tools = require("./utils/tools");
const {
    errorHandler,
    notFoundHandler,
} = require("./middlewares/errorMiddleware");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.all("*", (req, res, next) => {
    tools.logReq(req);
    next();
});

app.use("/auth", require("./router/authRouter"));

app.use(notFoundHandler, errorHandler);

module.exports = app;
