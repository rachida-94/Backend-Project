env file information you need for this application

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

USER ROUTES

Post-->/api/users/register(use this route to create new user)
Post-->/api/users/login  (use this route to log in)

PROJECT ROUTES:

Post-->/api/projects(use this route to create new project)
GET -->/api/projects(Get all the project by user)
GET -->/api/projects/:id(Get single project)
PUT -->/api/projects/:id(update a project)
DELETE -->/api/projects/:id(delete project)


TASK ROUTES:
Post-->/api/projects/:projectId/tasks(use this route to create new task under a project)
GET -->/api/projects/:projectid/tasks(Get all tasks for the current project)
PUT -->/api/tasks/:id(update a tasks)
DELETE -->/api/tasks/:id(delete tasks)



