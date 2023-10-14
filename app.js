const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();
const formRoute = require('./routes/form');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(formRoute);

sequelize.sync()
    .then((result) => {
        app.listen(4000);
    })
    .catch(err => console.log(err));
