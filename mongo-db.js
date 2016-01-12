var mongoose = require('mongoose'),  
    db = mongoose.createConnection('localhost', 'euro2012');
db.on('error', console.error.bind(console, 'connection error:'));  