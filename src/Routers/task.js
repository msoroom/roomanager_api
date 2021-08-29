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
  const room = req.body.room.name;

  discription.trim();

  if (!discription.includes(/\w/gim)) discription = undefined;

  try {
    const task = new Task({
      heading,
      discription,
      creator: req.user._id,
      room,
    });

    const task2 = await task.save();
    res.status(200).send(task2);
  } catch (e) {
    res.status(500).send();
  }
});

// gets spefic tasks
//query options
// ?sortBy=createdAt:desc||asc
// ?mode = C = Creator
//         R = Resover
//         U = Unify
//? limit = 10
// skip = 10
router.get("/specific/task", auth, auditlog, async (req, res) => {
  const sort = {};
  req.query;

  const custpath = req.query.mode.toUpperCase() + "Task";

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");

    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const a = await req.user
      .populate({
        path: custpath,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
  } catch (error) {
    console.warn(error);
    res.status(500).send(error);
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

router.get("/all/:room", auth, auditlog, async (req, res) => {});

// updates a task for a specific room
router.patch("/:room", auth, auditlog, async (req, res) => {});

//delete a task for a specific room
router.delete("/:room", auth, auditlog, async (req, res) => {});

module.exports = router;
