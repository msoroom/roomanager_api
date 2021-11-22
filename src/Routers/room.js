const express = require("express");
const auth = require("../middleware/auth");
const Room = require("../models/room");
const multer = require("multer");
const sharp = require("sharp");
const auditlog = require("../middleware/auditlog");
const roomModel = require("../models/room");

//set up router
const router = new express.Router();

//multer set Up for pics

const upload = multer({
  limits: {
    fieldSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be a jpg jpeg png"));
    }

    cb(undefined, true);
  },
});

//router routes
router.post("/", auth, auditlog, async (req, res) => {
  try {
    if (req.user.abb.cannot("create", "room")) {
      return res
        .status(400)
        .send({ error: "You are not permitted to do this" });
    }

    const room = new Room({
      ...req.body,
      props: {},
      buckedlist: {},
    });

    const done = await room.save();
    res.status(200).send(done);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
//get the name of all rooms

router.get("/", async (req, res) => {
  if (req.user.abb.cannot("read", "Room"))
    return res.status(400).send({ error: "You are not permitted to do this" });

  try {
    const a = await Room.find({}, { name: 1 });

    res.send(a);
  } catch (error) {
    res.status(500).send();
  }
});

//gets the information for an room
router.get("/:room", auth, auditlog, async (req, res) => {
  if (req.user.abb.cannot("read", "Room"))
    return res.send({ error: "Not engouth permissons" });
  const roomName = req.params.room;

  try {
    const information = await Room.find({ name: roomName }).accessibleBy(
      req.user.abb
    );

    res.send({ ...information });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:room/admin", auth, auditlog, async (req, res) => {
  //valid stuff

  //stuff
  const roomname = req.params.room;
  var updates = req.body;

  try {
    var room = await Room.findOne({ name: roomname });

    updates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => validUpdates.includes(key))
    );

    Object.assign(room, room, updates);
    room.save();
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/:room/admin/pics",
  auth,
  auditlog,
  upload.single("pic"),
  async (req, res) => {
    if (!(req.user.perms.edit_pics || req.user.perms.admin))
      return res.status(400).send({ error: "you are not permitted to update" });

    if (undefined === req.file)
      return res.status(400).send({ error: "Du musst eine file angeben" });

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1920, height: 1080 })
      .png()
      .toBuffer();

    const room = await Room.findOne({ name: req.params.room });

    room.pics.push({ pic: buffer });
    await room.save();

    res.send(room);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/:room/pic/admin", auth, auditlog, async (req, res) => {
  if (req.user.abb.cannot("delete", "Rooms", "pics"))
    return res.status(400).send({ error: "you are not permitted to update" });

  const delbil = req.body;

  try {
    var room = await Room.findOne({ name: req.params.room });

    room.pics = room.pics.filter((pic) => !delbil.includes(String(pic._id)));

    room.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
