import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Security middleware
app.use(helmet()); // Use Helmet for security

// Enable CORS for all origins (consider restricting to specific origins in production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json()); 

// Proxy endpoint to handle dynamic API paths (for GET, POST, PUT methods)
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

    // Fetch data from the external API
    const response = await fetch(url, fetchOptions);

    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (err) {
      return res.status(500).json({ error: 'Error parsing response from external API' });
    }

    if (response.ok) {
      res.status(200).json(data); // Send the data back to the client if successful
    } else {
      res.status(response.status).json({ error: 'Failed to fetch data from the API', details: data });
    }
  } catch (error) {
    console.error('Error handling request:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server on port 5000 (or another port of your choice)
const port = process.env.PORT || 5000;

// Listen on all network interfaces (0.0.0.0) so that it's accessible externally
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

// Handle all other routes and serve React app (assuming the React app is built)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
