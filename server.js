const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Root route - Serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API routes
app.get('/api/dinosaurs', async (req, res) => {
    try {
        let { data, error } = await supabase.from('dinosaur_facts').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs:', error.message);
        res.status(500).json({ error: 'Error fetching dinosaurs' });
    }
});

app.get('/api/dinosaurs/:name', async (req, res) => {
    const { name } = req.params;
    try {
        let { data, error } = await supabase.from('dinosaur_facts').select('*').ilike('name', `%${name}%`);
        if (error) throw error;
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'Dinosaur not found' });
        }
    } catch (error) {
        console.error('Error fetching dinosaur:', error.message);
        res.status(500).json({ error: 'Error fetching dinosaur' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
