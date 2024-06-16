require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://support-ticket-app-client.vercel.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tickets", require("./routes/ticket"));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server is running at port ${PORT}`));

module.exports = app;
