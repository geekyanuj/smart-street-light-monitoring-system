const Telemetry = require('../models/Telemetry');

exports.getLatest = async (req, res) => {
  try {
    const filter = req.query.feederId ? { feederId: req.query.feederId } : {};
    const latest = await Telemetry.findOne(filter).sort({ timestamp: -1 });
    res.json(latest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const filter = req.query.feederId ? { feederId: req.query.feederId } : {};
    const history = await Telemetry.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
