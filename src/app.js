const express = require("express");
const app = express();
const port = 3000;
app.use("/test", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("first app listening at http://localhost:" + port);
});
