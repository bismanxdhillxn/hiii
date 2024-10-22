// app.js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/welcome', (req, res) => {
    const user = 'John'; 

    res.render('welcome', { user });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
