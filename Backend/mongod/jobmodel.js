const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  taskId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  skillsReq: {
    type: String,
    required: true
  },
  projectStartDate: {
    type: String,
    required: false
  },
  projectEndDate: {
    type: String,
    required: false
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },
  machines: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: false
  },
  assigned: {
    type: Array,
    required: false
  },
  feLevel: {
    type: String,
    required: false
  },
  lead: {
    type: String,
    required: false
  },
  exp: {
    type: String,
    required: true
  },
  feCount: {
    type: Number,
    required: true
  },
  assignedCount: {
    type: Number,
    default: 0
  }
});

const Job = mongoose.model('Jobs', JobSchema);

module.exports = Job;
