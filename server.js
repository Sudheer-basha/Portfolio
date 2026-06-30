const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parser and URL-encoded parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const PORTFOLIO_JSON = path.join(DATA_DIR, 'portfolio.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Ensure necessary directories exist
[DATA_DIR, PUBLIC_DIR, UPLOADS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer for local file storage in public/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Sanitize filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// API: Get portfolio configuration
app.get('/api/portfolio', (req, res) => {
  if (!fs.existsSync(PORTFOLIO_JSON)) {
    return res.status(404).json({ error: 'Portfolio config file not found.' });
  }
  fs.readFile(PORTFOLIO_JSON, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading portfolio data:', err);
      return res.status(500).json({ error: 'Failed to read portfolio config.' });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error('Error parsing portfolio JSON:', parseErr);
      res.status(500).json({ error: 'Corrupt portfolio data format.' });
    }
  });
});

// API: Save portfolio configuration
app.post('/api/portfolio', (req, res) => {
  const updatedData = req.body;
  
  // Basic validation
  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Invalid portfolio data payload.' });
  }

  fs.writeFile(PORTFOLIO_JSON, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing portfolio data:', err);
      return res.status(500).json({ error: 'Failed to update portfolio data.' });
    }
    res.json({ success: true, message: 'Portfolio configuration updated successfully.' });
  });
});

// API: Handle file uploads (profile picture, project screenshot, resume, etc.)
app.post('/api/portfolio/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  
  // Return the web-accessible URL path
  const assetUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: assetUrl });
});

// Serve static assets
app.use(express.static(PUBLIC_DIR));

// Fallback to portfolio main page
app.get('*', (req, res, next) => {
  // If the path looks like an API or file, let it go to 404
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Server running successfully at http://localhost:${PORT}`);
  console.log(`Serving Interactive Portfolio & Outreach CRM files`);
  console.log(`==================================================`);
});
