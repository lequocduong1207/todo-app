// controllers/taskController.js
const {createTaskService, getTaskByUserId, updateTaskService, deleteTaskService} = require('../services/taskService.js'); 

const createTask = async (req, res) => {
  const task = req.body;
  task.userId = req.user._id;
  
  const data = await createTaskService(task);
  res.send(data);
};

const getAllTask = async (req, res) => {
  const data = await getTaskByUserId(req.user._id);

  res.send(data);
}

const updateTask = async (req, res) => {
  const data = await updateTaskService(req.body);

  res.send(data);
}

const deleteTask = async (req, res) => {
  const data = await deleteTaskService(req.body.taskId);

  res.send(data);
}

module.exports = {
        createTask,
        getAllTask,
        updateTask,
        deleteTask
}
