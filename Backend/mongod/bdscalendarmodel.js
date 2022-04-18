const mongoose = require('mongoose');

const BdsCalendarSchema = new mongoose.Schema({
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

const BdsCal = mongoose.model('BdsCalendar', BdsCalendarSchema);

module.exports = BdsCal;
