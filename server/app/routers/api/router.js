const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const parentRouter = require("./parent/router");

router.use("/parent", parentRouter);

/* ************************************************************************* */

module.exports = router;
