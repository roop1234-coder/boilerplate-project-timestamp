const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Tor main logic - 8ta test pass korabe
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  
  // Test 7,8: Empty date = current time
  if (!dateString) {
    let now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Test 2,3,4,5: Check unix timestamp or date string
  let date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);

  // Test 6: Invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});