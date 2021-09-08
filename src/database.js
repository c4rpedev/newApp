const mongoose = require('mongoose');

//const URI = 'mongodb://localhost/Login';
const URI = 'mongodb+srv://admin:Asdfg123*@cluster0.uzoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;