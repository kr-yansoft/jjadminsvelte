import express from 'express';
import cors from 'cors'; 
import data from '../src/lib/stores/data.js';
import data2 from '../src/lib/stores/data2.js'; 

const app = express();
const PORT = 5000;


app.use(cors());


app.get('/api/data', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;  
    const size = parseInt(req.query.size, 10) || 10;

    const totalRecords = data.length;  
    const startIndex = (page - 1) * size;  
    const endIndex = startIndex + size;    
    const paginatedData = data.slice(startIndex, endIndex);  

    
    res.json({
        totalRecords,
        data: paginatedData
    });
});


app.get('/api/data2', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;

    const totalRecords = data2.length;  
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = data2.slice(startIndex, endIndex);

    res.json({
        totalRecords,
        data2: paginatedData 
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
