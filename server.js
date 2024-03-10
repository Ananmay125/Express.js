const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more user credentials as needed
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the login page!');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/trendy.html', (req, res) => {
    res.sendFile(__dirname + '/trendy.html');
});

app.get('/login-success.html', (req, res) => {
    res.sendFile(__dirname + '/login-success.html');
});

app.get('/bruh.html', (req, res) => {
    res.sendFile(__dirname + '/bruh.html');
});

app.get('/among-us.html', (req, res) => {
    res.sendFile(__dirname + '/among-us.html');
});

app.get('/sus.html', (req, res) => {
    res.sendFile(__dirname + '/sus.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple authentication using an array of user credentials
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.authenticated = true;
        req.session.username = user.username;
        res.redirect('/login-success');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/login-success', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(__dirname + '/login-success.html');
    } else {
        res.redirect('/login');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
