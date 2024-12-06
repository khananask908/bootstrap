const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');  // Import CORS

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Load Google API credentials
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const { client_email, private_key } = credentials;
const spreadsheetId =
  "1hSzojuw_NC6qRLTulU5zkJq8QkE7WE9wXUkJpwDwjO0";

const auth = new google.auth.JWT(client_email, null, private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: "v4", auth });

// Endpoint to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1:C1", // Adjust range as per your Google Sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, age]],
      },
    });

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    res.status(500).json({ message: "Failed to save data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
