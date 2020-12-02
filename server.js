const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.use("/api", (req, res) => {
  res.send("CC16 Full Stack!");
});

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log("running 🚀!");
});
