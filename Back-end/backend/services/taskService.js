const tasks = require('../models/tasks.js');

const createTaskService = async (newTask) => {
      try {
            const now = new Date();

            const result = await tasks.create({
                  userId: newTask.userId,
                  jobTitle: newTask.jobTitle,
                  level: newTask.level,
                  createAt: now,
                  updateAt: now,
                  deadline: newTask.deadline,
                  note: newTask.note,
                  completed: false
            })

            return result;
      }
      catch (error) {
            console.log(error);
            return null;
      }
}

const getTaskByUserId = async (userId) => {
      try {
            const result = await tasks.find({ userId });
            return result;
      }
      catch (error) {
            console.log(error);
            return null;
      }
}

const updateTaskService = async (updated) => {
      try {
            const taskId = updated.task._id;

            const updateData = {
                  ...updated.values,
                  updateAt: new Date(), 
            };

            const updatedTask = await tasks.findByIdAndUpdate(taskId, updateData, { new: true });

            return updatedTask;
      } catch (error) {
            console.log(error);
            return null;
      }
}

const deleteTaskService = async (taskId) => {
      try {
            const result = await tasks.deleteOne({ _id: taskId });
            return result;
      }
      catch (error) {
            console.log(error);
            return null;
      }
}

module.exports = {
      createTaskService,
      getTaskByUserId,
      updateTaskService,
      deleteTaskService
}