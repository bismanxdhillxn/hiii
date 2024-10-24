// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let tasks = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 20 },
    { name: 'Keyboard', price: 50 },
    { name: 'Monitor', price: 150 },
];
const users = {
    alice: { age: 23, hobby: 'swimming' },
    bob: { age: 25, hobby: 'reading' },
    charlie: { age: 21, hobby: 'painting' },
};
const items = [
    'The Matrix',
    'The Godfather',
    'The Shawshank Redemption',
    'The Lord of the Rings',
    'The Dark Knight',
];


app.get('/', (req, res) => {
    res.render('profile');
});

app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    const user = users[username];
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.render('pindex', { username, ...user });
    }
});


app.get('/search', (req, res) => {
    const query = req.query.q;
    //filter the results
    const result = query ? items.filter((item) => item.toLowerCase().includes(query.toLowerCase())): items;

    res.render('search', { result });
});
app.get('/products', (req, res) => {
    let search = req.query.search;
    if(!search) {
        return res.render('partial', { products });
    }
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    res.render('partial', { products:filteredProducts });
});
app.get('/welcome', (req, res) => {
    const user = 'John'; 

    res.render('welcome', { user });
});
app.get('/todo', (req, res) => {
    res.render('todo', { tasks: tasks });
});


app.post('/add-task', (req, res) => {
    const task = req.body.task; 
    if (task) {
        tasks.push(task); 
    }
    res.redirect('/todo');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
