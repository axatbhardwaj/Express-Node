const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-errors');



const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task, amount: task.length })
})

const getTask = asyncWrapper(async (req, res, next) => {

    const { id: taskName } = req.params;
    // console.log(taskID);
    // console.log(id);
    const task = await Task.findOne({ name: taskName });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskName}`, 404))
        //return res.status(404).json({ msg: `Task not found with name : ${taskName} ` })
    } else {
        return res.status(200).json({ task });
    }
}
)

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    //res.send('create item ')
    res.status(201).json(task);
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskName } = req.params;
    const task = await Task.findOneAndUpdate({ name: taskName }, req.body, { new: true, runValidators: true });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskName}`, 404))
    }
    return res.status(200).json({
        Status: "Success",
        Task: task,
        msg: "Task Updated Successfully"
    })
})

const editTask = asyncWrapper(async (req, res) => {
    const { id: taskName } = req.params;
    const task = await Task.findOneAndUpdate({ name: taskName }, req.body, { new: true, runValidators: true, overwrite: true });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskName}`, 404))
    }
    return res.status(200).json({
        Status: "Success",
        Task: task,
        msg: "Task Updated Successfully"
    })
})

const deleteTask = asyncWrapper(async (req, res) => {
    // res.send('delete task')
    const { id: taskName } = req.params;
    const task = await Task.findOneAndDelete({ name: taskName });
    if (!task) {
        return res.status(404).json({ msg: `Task not found with name : ${taskName} ` })
    }
    return res.status(200).json({
        Status: "Success",
        Task: task,
        msg: "Task Deleted Successfully"
    });
})


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }


