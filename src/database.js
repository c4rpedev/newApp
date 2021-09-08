//Import
const mongoose = require('mongoose');

//dirección de la BD
const URI = 'mongodb+srv://admin:Asdfg123*@cluster0.uzoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//conexión con la BD
mongoose.connect(URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

//Export
module.exports = mongoose;