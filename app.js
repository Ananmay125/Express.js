const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');

const app = express();
const port = 3000;

const users = [
    { username: 'sick', password: 'cool123sick' },
    { username: 'cool', password: 'sick123cool' },
    { username: 'sus', password: 'sussybaka' },
    { username: 'penguin', password: 'penguin031'},
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const subreddit = 'memes';
const NUM_MEMES = 40;

let afterParam = '';

const clientID = 'isUoq3YZrPY_XDDL-wSlsw';
const clientSecret = '5_g9n_dH9N4ELfBONNoFHhb71mqpFA';

const redditAPI = axios.create({
    baseURL: 'https://www.reddit.com',
    headers: {
        'User-Agent': 'memesite/1.0'
    },
    auth: {
        username: clientID,
        password: clientSecret
    }
});

app.get('/random-memes', async (req, res) => {
    try {
        const redditResponse = await redditAPI.get(`/r/${subreddit}/top.json?limit=${NUM_MEMES}&after=${afterParam}`);
        const memes = redditResponse.data.data.children.map(post => ({
            title: post.data.title,
            imageUrl: post.data.url_overridden_by_dest
        }));
        afterParam = redditResponse.data.data.after;
        res.json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).send('Error fetching memes');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.authenticated = true;
        req.session.username = user.username;
        res.redirect('/login-success.html');
    } else {
        res.redirect('/login?error=Invalid credentials');
    }
});

app.get('/login-success.html', (req, res) => {
    if (req.session.authenticated) {
        res.sendFile(__dirname + '/login-success.html');
    } else {
        res.redirect('/login');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
