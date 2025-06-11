
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = 3001;

// // Allow your frontend to access this server
// app.use(cors());

// app.get('/weather', async (req, res) => {
//   const weatherurl = 'https://api.weatherlink.com/v1/NoaaExt.json?user=001D0A80A15C&pass=HHG2023&apiToken=8195D07EF06E419093F121BCF5108584';

//   try {
//     const response = await axios.get(weatherurl);
//     res.json(response.data); // Send the data back to frontend
//   } catch (error) {
//     console.error('Error fetching weather data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Weather proxy server running on http://localhost:${PORT}`);
// });
