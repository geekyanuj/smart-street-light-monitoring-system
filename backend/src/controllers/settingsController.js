const SystemSettings = require('../models/SystemSettings');
const mqttService = require('../services/mqttService');

exports.getSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { fetchFrequency, fetchTimes } = req.body;
    const settings = await SystemSettings.findOneAndUpdate(
      {},
      { fetchFrequency, fetchTimes },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.triggerManualFetch = async (req, res) => {
  try {
    // Send MQTT command to all or specific feeders to report status
    const success = mqttService.sendControl('FETCH_DATA');
    if (success) {
      await SystemSettings.findOneAndUpdate({}, { lastManualFetch: new Date() });
      res.json({ message: 'Manual fetch command sent' });
    } else {
      res.status(500).json({ message: 'Failed to send MQTT command' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
