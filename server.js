const express = require('express');
const path = require('path');
const hls = require('hls.js');

const app = express();

const PORT = process.env.PORT || 9090;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
