const mongoose = require('mongoose');

const AdminModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', AdminModelSchema);
module.exports = Admin;
