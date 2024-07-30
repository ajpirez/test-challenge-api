const mongoose = require("mongoose");
const container = require("./src/startup/container");
const server = container.resolve("app");
const {MONGO_URI} = container.resolve("config");

mongoose
    .connect(MONGO_URI)
    .then(server.start())
    .catch(console.log)
