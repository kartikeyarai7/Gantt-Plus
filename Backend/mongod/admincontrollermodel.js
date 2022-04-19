const mongoose = require('mongoose');

const AdminControllerModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const AdminController = mongoose.model('AdminController', AdminControllerModelSchema);
module.exports = AdminController;
