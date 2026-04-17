const mqtt = require('mqtt');
const Telemetry = require('../models/Telemetry');
const Feeder = require('../models/Feeder');

let client;

const init = (io) => {
  client = mqtt.connect(process.env.MQTT_BROKER);

  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe(process.env.TELEMETRY_TOPIC, (err) => {
      if (!err) {
        console.log(`Subscribed to ${process.env.TELEMETRY_TOPIC}`);
      }
    });
  });

  client.on('message', async (topic, message) => {
    if (topic === process.env.TELEMETRY_TOPIC) {
      try {
        const data = JSON.parse(message.toString());
        // Map compressed keys from ESP: {"v":v, "c":c, "p":p, "e":e, "r":r}
        const telemetryData = new Telemetry({
          feederId: data.id || "F1", // Default to F1 if missing for now
          voltage: data.v,
          current: data.c,
          power: data.p,
          energy: data.e,
          relayState: data.r
        });

        await telemetryData.save();
        
        // Update feeder last update time
        await Feeder.findOneAndUpdate(
          { feederId: telemetryData.feederId },
          { lastUpdate: new Date() }
        );
        
        // Broadcast to all connected socket clients
        io.emit('telemetry_update', telemetryData);
        console.log('Telemetry saved and broadcasted');
      } catch (error) {
        console.error('Error processing MQTT message:', error);
      }
    }
  });
};

const sendControl = (command) => {
  if (client && client.connected) {
    // command can be "1" for ON, "0" for OFF or a JSON string
    client.publish(process.env.CONTROL_TOPIC, command);
    console.log(`Control command sent: ${command}`);
    return true;
  }
  return false;
};

module.exports = { init, sendControl };
