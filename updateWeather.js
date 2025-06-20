const fs = require('fs');
const fetch = require('node-fetch');

const FILE_PATH = 'weather_data.json';
const API_URL = 'https://script.google.com/macros/s/AKfycbyVt7ckVjdY4MmYsAiMIowGTLqNgQ3LwI-E2S_bRkqWCHDmLNedaX2q1LCyd_SPFw/exec';

(async () => {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();

    const weatherSensor = json.sensors.find(
      s => s.sensor_type === 53 && s.data_structure_type === 7
    );

    if (!weatherSensor || !Array.isArray(weatherSensor.data)) {
      throw new Error("Valid weather sensor data not found.");
    }

    const newData = weatherSensor.data.map(d => ({
      ts: d.ts,
      temp_out: d.temp_out,
      hum_out: d.hum_out,
      rainfall_mm: d.rainfall_mm,
      solar_rad_avg: d.solar_rad_avg,

    }));

    const file = fs.existsSync(FILE_PATH)
      ? JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
      : [];

    // Remove duplicates (based on timestamp)
    const allData = [...file, ...newData].reduce((acc, entry) => {
      acc[entry.ts] = entry;
      return acc;
    }, {});

    const merged = Object.values(allData).sort((a, b) => a.ts - b.ts);

    fs.writeFileSync(FILE_PATH, JSON.stringify(merged, null, 2));
    console.log(`Appended ${newData.length} entries.`);
  } catch (err) {
    console.error("Error fetching or updating weather data:", err);
    process.exit(1);
  }
})();
