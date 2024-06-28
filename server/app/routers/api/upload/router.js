const express = require("express");

const router = express.Router();

const { addImages } = require("../../../controllers/uploadActions");

router.post("/", addImages);

module.exports = router;
