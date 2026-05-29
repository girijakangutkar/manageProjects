const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {type: String, required: true},
    projectDescription: {type: String, required: true},
    createdBy: {type: String}
}, {timestamps: true})

const projectModel = mongoose.model("projects", projectSchema);

module.exports = projectModel;