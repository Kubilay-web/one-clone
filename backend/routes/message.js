const express = require("express");
const { authUser } = require("../middlwares/auth");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller.js");

const router = express.Router();

router.post("/", authUser, sendMessage);

router.get("/:convo_id", authUser, getMessages);

module.exports = router;
