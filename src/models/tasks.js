const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    headings: {
        type:Number,
        required: true,

    },
    discription: {
        type:String,
        required: true,
    },

    state:{
        type:Number,
        required: true,
        default: 0,

    },
    

    user:{

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Room",
      },    

},{

    timestamps:true

});


const Taskmodel = new mongoose.Model("Task", taskSchema)

module.exports = Taskmodel