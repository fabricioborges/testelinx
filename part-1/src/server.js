require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const username = process.env.USERMONGO;
const password = process.env.PASSWORDMONGO;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.royef.mongodb.net/linxpart-1?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(routes);

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

module.exports = server