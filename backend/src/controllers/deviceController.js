const mqttService = require('../services/mqttService');

exports.controlRelay = async (req, res) => {
  const { state } = req.body; // "1" for ON, "0" for OFF

  if (state === undefined) {
    return res.status(400).json({ message: "State is required" });
  }

  const success = mqttService.sendControl(state.toString());

  if (success) {
    res.json({ message: `Relay command ${state} sent successfully` });
  } else {
    res.status(500).json({ message: "Failed to send MQTT command" });
  }
};
