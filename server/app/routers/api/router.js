const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const parentRouter = require("./parent/router");

router.use("/parent", parentRouter);

const nurseryRouter = require("./nursery/router");

router.use("/nursery", nurseryRouter);

/* ************************************************************************* */

module.exports = router;
