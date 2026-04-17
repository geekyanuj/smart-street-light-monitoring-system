const Feeder = require('../models/Feeder');

exports.getAllFeeders = async (req, res) => {
  try {
    const feeders = await Feeder.find();
    res.json(feeders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeederById = async (req, res) => {
  try {
    const feeder = await Feeder.findOne({ feederId: req.params.id });
    if (!feeder) return res.status(404).json({ message: 'Feeder not found' });
    res.json(feeder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertFeeder = async (req, res) => {
  try {
    const { feederId, ward, area, thresholds, location } = req.body;
    const feeder = await Feeder.findOneAndUpdate(
      { feederId },
      { ward, area, thresholds, location },
      { new: true, upsert: true }
    );
    res.json(feeder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getWardsAndAreas = async (req, res) => {
  try {
    const feeders = await Feeder.find({}, 'ward area feederId');
    const hierarchy = feeders.reduce((acc, curr) => {
      if (!acc[curr.ward]) acc[curr.ward] = {};
      if (!acc[curr.ward][curr.area]) acc[curr.ward][curr.area] = [];
      acc[curr.ward][curr.area].push(curr.feederId);
      return acc;
    }, {});
    res.json(hierarchy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
