const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "new",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    default: "user",
  },
});
taskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Task", taskSchema);
