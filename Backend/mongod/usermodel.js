const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  isLeader: {
    type: Array,
    required: true
  },
  machines: {
    type: Array,
    required: true
  },
  countries: {
    type: Array,
    required: false
  },
  nationality: {
    type: String,
    required: true
  },
  assignedTo: {
    type: Array,
    required: false
  },

  productExp: {
    type: Array,
    required: true
  },
  feLevel: {
    type: String,
    required: true
  },
  exp: {
    type: Array,
    required: true
  },
  religion: {
    type: String,
    required: false
  },
  languages: {
    type: Array,
    required: false
  },
  gid: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
