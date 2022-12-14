const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  //Get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find().populate("devices");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("devices");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Xoá tài khoản thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update user
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update pass
  updatePassUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const user = await User.findOne({
        _id: req.params.id,
      });
      const comparePwd = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (comparePwd) {
        await User.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: { password: hashed } }
        );
        res.status(200).json("Đổi mật khẩu thành công");
      } else {
        res.status(400).json("Mật khẩu cũ không đúng");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
