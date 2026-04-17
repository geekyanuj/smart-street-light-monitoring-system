const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  fetchFrequency: { type: Number, default: 2 }, // times per day
  fetchTimes: { type: [String], default: ["06:00", "18:00"] },
  lastManualFetch: { type: Date }
});

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
