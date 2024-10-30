import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // Enable CORS

// Helper function to read data from JSON files
function getDataFromFile(fileName) {
    const filePath = path.resolve(__dirname, `../src/lib/data/${fileName}.json`);
    try {
        console.log(`Reading data from: ${filePath}`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
        return null;
    }
}

// API route for paginated data
app.get('/api/data/:fileName', (req, res) => {
    const { fileName } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;

    const data = getDataFromFile(fileName);

    if (!data) {
        return res.status(500).json({ error: 'Failed to load data from file.' });
    }

    const totalRecords = data.length;
    const startIndex = (page - 1) * size;
    const paginatedData = data.slice(startIndex, startIndex + size);

    res.json({
        totalRecords,
        data: paginatedData
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
