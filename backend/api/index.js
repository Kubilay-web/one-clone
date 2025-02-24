const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(cookieParser());
app.use(compression());

const corsOptions = {
  origin: "https://www.one-clone.com", // Allow this origin
  credentials: true, // Allow credentials like cookies or authorization headers
};

app.use(cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes

// backend dizinindeki 'routes' klasörüne mutlak yol ile erişim
const routesPath = path.join(__dirname, "../routes"); // 'backend/routes' yolunu alır

// routes klasöründeki dosyaları oku ve her birini 'app.use' ile kullan
fs.readdirSync(routesPath).forEach((r) => {
  app.use("/", require(path.join(routesPath, r)));
});

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
