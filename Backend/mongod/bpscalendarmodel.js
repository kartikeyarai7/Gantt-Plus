const mongoose = require('mongoose');

const BpsCalendarSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  pmCount: {
    type: String,
    required: true
  },
  doneBy: {
    type: String,
    required: true
  },
  range: {
    type: Array,
    required: false
  }
});

const BpsCal = mongoose.model('BpsCalendar', BpsCalendarSchema);

module.exports = BpsCal;
