const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI).then(() => {
    console.log("Database connection established")
}).catch((err) => {
    console.log(`Error while connecting to the db ${err.message}`)
})

