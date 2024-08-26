const mongoose = require('mongoose');

async function dbConnection(url) {
    return await mongoose.connect();
}


module.exports = { 
    dbConnection,
}