const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/*
CREATE USER
*/
exports.createUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      res.status(400);
      throw new Error(
        "User already exists"
      );
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    console.log(
      `[REGISTER] ${user.email}`
    );

    res.status(201).json({
      success: true,
      message:
        "Registration Successful",
    });
  } catch (error) {
    next(error);
  }
};

/*
LOGIN USER
*/
exports.loginUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      console.log(
        `[LOGIN FAILED] ${email}`
      );

      res.status(400);

      throw new Error(
        "Invalid Credentials"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      console.log(
        `[LOGIN FAILED PASSWORD] ${email}`
      );

      res.status(400);

      throw new Error(
        "Invalid Credentials"
      );
    }

    const token =
      jwt.sign(
        {
          id:
            user._id,
          role:
            user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            "1d",
        }
      );

    console.log(
      `[LOGIN SUCCESS] ${email}`
    );

    res.status(200).json({
      success: true,

      token,

      user: {
        id:
          user._id,
        name:
          user.name,
        email:
          user.email,
        role:
          user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
GET ALL USERS
*/
exports.getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await User.find();

    res.status(200).json(
      users
    );
  } catch (error) {
    next(error);
  }
};

/*
UPDATE USER
*/
exports.updateUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!user) {
      res.status(404);

      throw new Error(
        "User not found"
      );
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/*
DELETE USER
*/
exports.deleteUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      res.status(404);

      throw new Error(
        "User not found"
      );
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};