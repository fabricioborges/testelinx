require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT;
const username = process.env.USERMONGO;
const password = process.env.PASSWORDMONGO;

const app = express();

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.royef.mongodb.net/linxpart-1?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);