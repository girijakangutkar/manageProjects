const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, requrired: true},
    password: {type: String, requrired: true},
    userRole: {type: String, enum: ["user", "manager", "admin"], default: "user"}
})

const authModel = mongoose.model("users", authSchema);

module.exports = authModel;