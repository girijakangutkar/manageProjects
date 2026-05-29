# Manage Projects

A RESTful API built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication** to manage projects and users.
---
Deployed link
```
https://manage-projects-psi.vercel.app/api-docs
```
## Features
- User authentication (signup, login, logout)
- JWT-based authorization
- CRUD operations for projects
- Role-based access control (admin, manager and user)

---

## Authentication
All protected routes require a valid JWT token in the `Authorization` header:

```http
Authorization: Bearer <your_token>

Auth endpoints
POST auth/signup → Register a new user
POST auth/login → Login and receive JWT
POST auth/logout → Logout (client removes token)

Projects endpoints
GET api/projects → Get all projects
POST api/projects → Add a new project
PUT api/projects/:id → Edit a project
DELETE api/projects/:id → Delete a project
```
---
## getAllProjects:
```json
{
  "msg": "Projects found",
  "proList": [
    {
      "_id": "64b2f9c1234567890abcdef",
      "projectName": "Alpha Project",
      "projectDescription": "Initial phase of alpha testing",
      "createdBy": "64b2f9c1234567890abc111",
      "status": "active"
    }
  ]
}
```
---
## addProject
```json
{
    "msg": "Project added successfully",
    "data": {
        "projectName": "User 1 project",
        "projectDescription": "User 2 description",
        "createdBy": "6a198b8ba876652716775e9d",
        "_id": "6a19a036bb5f9c6b29f3d10b",
        "createdAt": "2026-05-29T14:18:30.702Z",
        "updatedAt": "2026-05-29T14:18:30.702Z",
        "__v": 0
    }
}
```
---
## editProject
``` json
{
    "msg": "Project edited successfully",
    "data": {
        "_id": "6a1996506029698d66012019",
        "projectName": "Project Edit 1",
        "projectDescription": "Testing Edit 1",
        "__v": 0,
        "updatedAt": "2026-05-29T13:49:45.530Z"
    }
}
```
---

## deleteProject
```json
{
    "msg": "Project deleted successfully"
}
```
---

## Tech Stack
Express.js for server
MongoDB + Mongoose for database
JWT for authentication
bcrypt for password hashing

## Permissions

Admin
```
get, post, put, delete
```
Manager:
```
get, post, put
```
User:
```
get, post, put, delete
```
---
## Note: 
Gave permission of editing the project to the user to implmenting the only editing the project owned by the user (Only for user role)

## Deployment Screenshots

Status endpoint
<img width="1380" height="284" alt="image" src="https://github.com/user-attachments/assets/002cc90f-eb67-443d-81ca-7c5e270c0a63" />
API docs endpoint
<img width="1911" height="956" alt="image" src="https://github.com/user-attachments/assets/75e05133-e29f-41df-a734-a75c5bbbee09" />
