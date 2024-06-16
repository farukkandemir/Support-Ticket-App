require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tickets", require("./routes/ticket-routes"));

// Connect to MongoDB

mongoose
  .connect(
    "mongodb+srv://farukkandemir09:uReEf2v9dGNbtKIC@helpdesk.2mfutjj.mongodb.net/"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server is running at port ${PORT}`));

/// mongodb credentials
// username: farukkandemir09
// password: uReEf2v9dGNbtKIC
// dbname: helpdesk
// uri : mongodb+srv://farukkandemir09:uReEf2v9dGNbtKIC@helpdesk.2mfutjj.mongodb.net/
