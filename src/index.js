let express = require('express');
let app = express();

let studentRoute = require('./routes/student');

let path = require('path');

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let core = require('cors');

const server = 'localhost';
const port = 27017;
const database = 'nti-development';
const user = 'nti';
const password = 'Esport';

// connect to mongodb
mongoose.connect(`mongodb://${server}:${port}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.once('open', () => {
    console.log('Connection has been made ...');
}).on('error', (error) => {
    console.log('Connection error: ', error);
});

app.use(bodyParser.json());
app.use(core());
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

app.use(studentRoute);
app.use(express.static('public'));

// Handler 404
app.use((req, res, next) => {
    res.status(404).send('we think you are lost!');
    next();
});

// Handler 500
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000;
const SERVER = process.env.SERVER || '127.0.0.1';
app.listen(PORT, () => {
    console.info(`Server has started on port ${PORT} and is CORS-enabled`);
    console.info(`Drone is connected to the sever over tcp-ip:port ${SERVER}:${PORT}`);
});