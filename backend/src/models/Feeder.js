const mongoose = require('mongoose');

const feederSchema = new mongoose.Schema({
  feederId: { type: String, required: true, unique: true },
  ward: { type: String, required: true },
  area: { type: String, required: true },
  poleCount: { type: Number, default: 20 },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  thresholds: {
    minVoltage: { type: Number, default: 180 },
    maxVoltage: { type: Number, default: 260 },
    minPower: { type: Number, default: 100 },
    maxPower: { type: Number, default: 2000 }
  },
  lastUpdate: { type: Date }
});

module.exports = mongoose.model('Feeder', feederSchema);
