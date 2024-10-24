const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the contact form
app.get('/contact', (req, res) => {
    res.render('contact', { error: null });
});

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        const error = "All fields are required.";
        return res.render('contact', { error });
    }

    // Here you would typically process the data (e.g., save it or send an email)
    res.render('thank_you', { name, email, message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
