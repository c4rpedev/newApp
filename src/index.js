//Imports
const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const startup = require('./security/startup');
const { mongoose } = require('./database');

//Variables
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use(require('./routes/home.routes'));
app.use('/api/auth' ,require('./routes/auth.routes'));
app.use('/api/role',require('./routes/role.routes'));
app.use('/api/user',require('./routes/user.routes'));


//Creating initial data BD
startup.init();

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});