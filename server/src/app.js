const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();
//requests with origin from the front-end are whitelisted using the corresponding CORS headers
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
  })
);
//logging with morgan
app.use(morgan("short"));

//request comes in and is parsed for json input
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
//then request is sent to router, we can use versionning by create another router with the /routes/api.js
app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
