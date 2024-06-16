require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tickets", require("./routes/ticket-routes"));

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server is running at port ${PORT}`));

/// mongodb credentials
// username: farukkandemir09
// password: uReEf2v9dGNbtKIC
// dbname: helpdesk
// uri : mongodb+srv://farukkandemir09:uReEf2v9dGNbtKIC@helpdesk.2mfutjj.mongodb.net/
