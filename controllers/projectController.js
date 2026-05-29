const projectModel = require("../model/ProjectModel");
const jwt = require("jsonwebtoken");
const express = require("express");

exports.getAllProjects = async(req, res) => {
    try {
        const allProjects = await projectModel.find();

        if(!allProjects){
            return res.status(404).json({msg: "No projects found"})
        }

        res.status(200).json({msg: "Projects found", proList: allProjects});
    } catch (error) {
        res.status(500).json({msg: "Something went wrong while fetching the pages"})
    }
}

exports.addProject = async(req, res) => {
    try {
        const { projectName, projectDescription } = req.body;
        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!projectName || !projectDescription){
            return res.status(400).json({msg: "ProjectName or projectDescription is required"})
        }

        const newProject = await projectModel.create({
            projectName,
            projectDescription,
            createdBy: decoded.userId
        })

        res.status(201).json({msg: "Project added successfully", data: newProject})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Something went wrong while adding the project"})
    }
}

exports.editProject = async(req, res) => {
    try {
        const proId = req.params.id;
        const { projectName, projectDescription} = req.body;
        if(!proId){
            return res.status(400).json({msg: "Id of project is required"})
        }

        const findProject = await projectModel.findById(proId);

        if(!findProject){
            return res.status(404).json({msg: "No such project found"});
        }

        // Check for owner
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Only for user to edit the projects belongs to them
        if(decoded.role === "user" && decoded.userId){
            if(findProject.createdBy !== decoded.userId){
                return res.status(403).json({msg: "You are not allowed to edit this project"})
            }
        }

        const addProData = {
            projectName,
            projectDescription
        }

        const updatedPorject = await projectModel.findByIdAndUpdate(proId, addProData, {new: true});

        res.status(200).json({msg: "Project edited successfully", data: updatedPorject})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Something went wrong while editing the project"})
    }
}


exports.deleteProject = async(req, res) => {
    try {
        const proId = req.params.id;
        if(!proId){
            return res.status(400).json({msg: "Id of project is requried"})
        }

        await projectModel.findByIdAndDelete(proId);

        res.status(200).json({msg: "Project deleted successfully"})
    } catch (error) {
        res.status(500).json({msg: "Something went wrong while deleting the project"})
    }
}