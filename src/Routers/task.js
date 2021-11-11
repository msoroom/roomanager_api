const express = require("express");
const auth = require("../middleware/auth");
const Room = require("../models/room");
const Task = require("../models/task");
const User = require("../models/user");

const auditlog = require("../middleware/auditlog");

const router = express.Router();

//create a task for a specific room
//->heading
//->discription
//->user => reqest
//->reqest

router.post("/:room", auth, auditlog, async (req, res) => {
  // Every thing nesseary for that shit
  if (req.user.abb.cannot("create", "Room"))
    return res.status(401).send({ error: "Du bist nicht berechtigt" });

  const heading = req.body.heading;
  const discription = String(req.body.discription);
  const userid = req.user._id;
  const room = req.params.room;

  discription.trim();

  if (!discription.match(/\w/gim)) discription = undefined;

  try {
    const task = new Task({
      heading,
      discription,
      creator: req.user._id,
      room,
    });

    const task2 = await task.save();
    res.status(201).send(task2);
  } catch (e) {
    res.status(400).send();
  }
});

//get all tasks

// req.body filter by any propety

router.get("/all", auth, auditlog, async (req, res) => {});

// gets spefic tasks
//query options
// ?sortBy=createdAt:desc||asc
// ?mode = C = Creator
//         R = Resover
// ?match = name of task

//? limit = 10
// skip = 10
router.get("/related", auth, auditlog, async (req, res) => {
  const sort = {};

  const match = req.body !== undefined ? req.body : undefined;

  const path =
    req.query.path === undefined
      ? String(req.query.mode.toUpperCase() + "Task")
      : undifined;

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");

    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path,
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    // console.log("Match:" + match + "\n" + req.user[path]);

    res.status(200).send(req.user[path]);
  } catch (error) {
    console.warn(error);
    res.status(500).send(error);
  }
});

router.get("/all/:room", auth, auditlog, async (req, res) => {});

// updates a task for a specific room
router.patch("/:room", auth, auditlog, async (req, res) => {});

//delete a task for a specific room
router.delete("/:room", auth, auditlog, async (req, res) => {});

module.exports = router;
