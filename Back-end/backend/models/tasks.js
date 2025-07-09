const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  jobTitle: String,
  level: String,
  createAt: Date,
  updateAt: Date,
  deadline: Date,
  note: String,
  completed: Boolean
});

module.exports = mongoose.model('tasks', taskSchema);
