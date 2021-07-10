const express = require("express");
const auth = require("../middleware/auth");
const Room = require("../models/room");

const auditlog = require("../middleware/auditlog");

const router = express.Router()

// gets all tasks 
//query options
// ?sortBy=createdAt:desc||asc
// ? findBy = 



router.get("/all", auth , auditlog, async (req, res) =>{
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

})

// gets all tasks for a specific user
router.get("/all/:room",auth,auditlog, async (req, res)=>{})

//adds a task for a specific room
router.post("/:room",auth,auditlog, async (req, res)=>{})

// updates a task for a specific room
router.patch("/:room",auth,auditlog, async (req, res)=>{})

//delete a task for a specific room
router.delete("/:room",auth,auditlog, async (req, res)=>{})





module.exports = router;