const mongoose = require('mongoose');
const config = require('./default.json');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log("MongoDB connected!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB();