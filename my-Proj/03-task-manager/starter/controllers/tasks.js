const Task = require('../models/Task')
const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskName } = req.params;
        // console.log(taskID);
        // console.log(id);
        const task = await Task.findOne({ name: taskName });
        if (!task) {
            return res.status(404).json({ msg: `Task not found with name : ${taskName} ` })
        } else {
            res.status(200).json({ task });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        //res.send('create item ')
        res.status(201).json(task);

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error.message })
    }
}


const updateTask = async (req, res) => {
    try {
        const { id: taskName } = req.params;
        const task = await Task.findOneAndUpdate({ name: taskName }, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ msg: `Task not found with name : ${taskName} ` })
        }
        return res.status(200).json({
            Status: "Success",
            Task: task,
            msg: "Task Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const editTask = async (req, res) => {
    try {
        const { id: taskName } = req.params;
        const task = await Task.findOneAndUpdate({ name: taskName }, req.body, { new: true, runValidators: true, overwrite: true });
        if (!task) {
            return res.status(404).json({ msg: `Task not found with name : ${taskName} ` })
        }
        return res.status(200).json({
            Status: "Success",
            Task: task,
            msg: "Task Updated Successfully"
        })
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const deleteTask = async (req, res) => {
    // res.send('delete task')
    try {
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
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }


