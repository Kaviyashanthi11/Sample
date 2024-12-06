// /api/proxy.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const response = await fetch('https://rcm1-eclaimstatus.com/React/web/index.php?r=api/maintenance-master-view');
  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json({ error: 'Failed to fetch data' });
  }
}
