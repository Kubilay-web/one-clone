const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const compression = require("compression");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes
readdirSync("../routes").map((r) => app.use("/", require("../routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
