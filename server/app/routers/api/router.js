const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const moderatorRouter = require("./moderator/router");

router.use("/moderator", moderatorRouter);

const parentRouter = require("./parent/router");

router.use("/parent", parentRouter);

const childRouter = require("./child/router");

router.use("/child", childRouter);

const allergyRouter = require("./allergy/router");

router.use("/allergy", allergyRouter);

const bookingOperationRouter = require("./booking-operation/router");

router.use("/booking-operation", bookingOperationRouter);

const uploadRouter = require("./upload/router");

router.use("/upload", uploadRouter);

const nurseryRouter = require("./nursery/router");

router.use("/nursery", nurseryRouter);

/* ************************************************************************* */

module.exports = router;
