const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Or for more fine-grained control:
app.use(cors({
  origin: 'https://your-react-app-url.com',  // Your React app URL (or '*')
  methods: 'GET, POST',  // Allow only certain HTTP methods
  allowedHeaders: 'Content-Type, Authorization',  // Allow certain headers
}));

// Define your API routes here
app.get('/api/maintenance-master-view', (req, res) => {
  res.json({ message: 'Data from the backend' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
