const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/StudentDB');
        console.log("Connection success");
    } catch (err) {
        console.log("Error in connection: " + err);
    }
}

connectDB();

require("./student.model");
