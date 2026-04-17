const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Feeder = require('./src/models/Feeder');

const feeders = [
  {
    feederId: "F1",
    ward: "Ward 1",
    area: "Main Market",
    poleCount: 20,
    location: { lat: 23.780, lng: 86.430 },
    thresholds: { minPower: 500, maxPower: 1500 }
  },
  {
    feederId: "F2",
    ward: "Ward 1",
    area: "Railway Station",
    poleCount: 20,
    location: { lat: 23.785, lng: 86.435 },
    thresholds: { minPower: 400, maxPower: 1400 }
  },
  {
    feederId: "F3",
    ward: "Ward 2",
    area: "City Hospital",
    poleCount: 20,
    location: { lat: 23.790, lng: 86.440 },
    thresholds: { minPower: 600, maxPower: 1600 }
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Feeder.deleteMany({});
    await Feeder.insertMany(feeders);
    console.log('Seed data inserted');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
