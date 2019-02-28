let mongoose = require('mongoose');

const server = 'localhost';
const port = 27017;
const database = 'nti-development';
const user = 'nti';
const password = 'Esport';

mongoose.connect(`mongodb://${server}:${port}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

let StudentSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);