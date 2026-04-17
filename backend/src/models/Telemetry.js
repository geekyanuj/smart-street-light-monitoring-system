const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
  feederId: { type: String, required: true },
  voltage: { type: Number, required: true },
  current: { type: Number, required: true },
  power: { type: Number, required: true },
  energy: { type: Number, required: true },
  relayState: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Telemetry', telemetrySchema);
