const express = require('express');
const bParser = require('body-parser');
const ejs = require('ejs');
const mongoConnect = require('./db').mongoConnect;

const port = 3000;

const app = express();
app.set('view engine', ejs);
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render("index.ejs");
});

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`app running on port ${port}\n`);
    });
});