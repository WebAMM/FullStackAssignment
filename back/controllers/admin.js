const Task = require("../models/task");
const User = require("../models/userModel");
const CustomError = require("../models/CustomError");

exports.createTaskEntry = async (req, res, next) => {
  // console.log("req.body", req.body);
  if (!req.body) {
    return next(new CustomError("Body cannot be empty", 400));
  }
  // return false;
  let creator = req.body.creator;
  try {
    let insertDate = {
      title: req.body.name,
      description: req.body.description,
      created_by: "admin",
    };
    if (req.body.published) {
      insertDate["published"] = req.body.published;
    }
    const task = await Task.create(insertDate);
    return res.status(201).send({ success: true, task });
  } catch (err) {
    // console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

exports.findAll = async (req, res, next) => {
  const { page, size, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  const { limit, offset } = getPagination(page, size);
  const populate = {
    path: "creator",
    select: "username",
  };
  try {
    const data = await Task.paginate(condition, {
      populate,
      sort: { published: -1 },
      offset,
      limit,
    });
    if (!data) {
      return next(new CustomError("task not found", 404));
    }
    res.send({
      success: true,
      total: data.totalDocs,
      data: data.docs,
      total_pages: data.totalPages,
      currentPage: data.page - 1,
      per_page: limit,
    });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

exports.update = async (req, res, next) => {
  try {
    // console.log("update is called", req.body);
    const edittask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!edittask) {
      return next(new CustomError("task not found", 404));
    }

    return res.status(200).send({ success: true, task: edittask });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new CustomError("Task not found", 404));
    }

    await task.remove(req.params.id);

    return res.send({ success: true, task });
  } catch (err) {
    console.log("error", err);
    next(new CustomError("Something went wrong", 500));
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
