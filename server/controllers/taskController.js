const Task = require("../models/Task");

/*
CREATE TASK
*/
exports.createTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await Task.create(req.body);

    console.log(
      `[TASK CREATED] ${task.title}`
    );

    res.status(201).json({
      success: true,
      data: task,
    });

  } catch (error) {
    next(error);
  }
};

/*
GET ALL TASKS
*/
exports.getTasks = async (
  req,
  res,
  next
) => {
  try {

    const tasks =
      await Task.find()
        .populate(
          "assignedUser"
        );

    res.status(200).json(
      tasks
    );

  } catch (error) {
    next(error);
  }
};

/*
UPDATE TASK
*/
exports.updateTask = async (
  req,
  res,
  next
) => {
  try {

    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!task) {

      res.status(404);

      throw new Error(
        "Task not found"
      );
    }

    console.log(
      `[TASK UPDATED] ${task.title}`
    );

    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    next(error);
  }
};

/*
DELETE TASK
*/
exports.deleteTask = async (
  req,
  res,
  next
) => {
  try {

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {

      res.status(404);

      throw new Error(
        "Task not found"
      );
    }

    await Task.findByIdAndDelete(
      req.params.id
    );

    console.log(
      `[TASK DELETED] ${task.title}`
    );

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};