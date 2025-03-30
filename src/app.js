const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log("first app listening at http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.error("ERRR" + err);
  });
