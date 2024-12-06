import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins (you can restrict to specific origins if necessary)
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Proxy endpoint to handle dynamic API paths (for GET, POST, and PUT methods)
app.all('/api/*', async (req, res) => {
  try {
    const apiPath = req.params[0]; // Extract the API path from the request
    const url = `https://rcm1-eclaimstatus.com/React/web/index.php?r=api/${apiPath}`; // External API URL

    const fetchOptions = {
      method: req.method, // Use the same HTTP method (GET, POST, PUT, etc.)
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === 'POST' || req.method === 'PUT' ? JSON.stringify(req.body) : undefined, // Attach body for POST and PUT requests
    };

    const response = await fetch(url, fetchOptions); // Forward the request to the external API
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Send the data back to the client if successful
    } else {
      res.status(response.status).json({ error: 'Failed to fetch data from the API' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server on port 5000 (or another port of your choice)
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
