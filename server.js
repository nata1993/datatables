const express = require('express');
const bParser = require('body-parser');
const ejs = require('ejs');
const mongoConnect = require('./db').mongoConnect;
const db = require('./db');

const port = 3000;

const app = express();
app.use(bParser.urlencoded({extended: true}));
app.set('view engine', ejs);
app.use(express.static('public'));

app.get('/', (req, res) =>{
    db.fetchAll().then(data =>{
        res.render("index.ejs", { data : data });
    });
});

app.post('/addData', (req, res) => {

    if(req.body.name != "" &&
        req.body.position != "" &&
        req.body.office != "" &&
        req.body.extn != "" &&
        req.body.startDate != "" &&
        req.body.salary != ""){
            db.save(
                req.body.name, 
                req.body.position, 
                req.body.office, 
                req.body.extn, 
                req.body.startDate, 
                req.body.salary
            );
    }
    res.redirect('/');
});

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`app running on port ${port}\n`);
    });
});