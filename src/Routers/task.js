const express = require("express");
const auth = require("../middleware/auth");
const Room = require("../models/room");
const Task = require("../models/tasks");

const auditlog = require("../middleware/auditlog");

const router = express.Router();

//create a task for a specific room
//->heading
//->discription
//->user => reqest
//->reqest

router.post("/:room", auth, auditlog, async (req, res) => {
  // Every thing nesseary for that shit
  const heading = req.body.heading;
  const discription = String(req.body.discription);
  const userid = req.user._id;
  const room = req.body.room;

  discription.trim();

  if (!discription.includes(/\w/gim)) discription = undefined;

  try {
    const task = new Task({
      heading,
      discription,
      userid,
      room,
    });

    const task2 = await task.save();
    res.status(200).send(task2);
  } catch (e) {
    res.status(500).send();
  }
});

// gets all tasks
//query options
// ?sortBy=createdAt:desc||asc
// ? findBy =
router.get("/all", auth, auditlog, async (req, res) => {
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");

    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  // try {
  //   await req.user
  //     .populate({
  //       path: "runs",
  //       options: {
  //         limit: parseInt(req.query.limit),
  //         skip: parseInt(req.query.skip),
  //         sort,
  //       },
  //     })
  //     .execPopulate();
  // } catch (e) {

  // }
});

// gets mentions tasks for a specific user
//mode c = created 
//mode o = owner
//mode a = adviced

//query options
// ?sortBy=createdAt:desc||asc

router.get("/all/:room", auth, auditlog, async (req, res) => {





});

// updates a task for a specific room
router.patch("/:room", auth, auditlog, async (req, res) => {});

//delete a task for a specific room
router.delete("/:room", auth, auditlog, async (req, res) => {


  



});

module.exports = router;
