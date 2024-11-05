# Asset Warehouse

Asset Warehouse is a full-stack web app inspired by Sketchfab. It allows users to upload, view, and manage 3D models. The goal was to learn about building full-stack web apps, so functionality was prioritized over design.

## React Frontend

I chose React for learning purposes and popularity.

## Asset Viewer

The asset viewer was built using react-three-fiber, a React renderer for three.js. I chose three.js because I wanted to focus more on building a fullstack web app than building another 3D renderer, although that would have been fun. Will probably consider this as a future project. 


## Uploads

Uploads go directly from the client to S3 (DO Spaces) using pre-signed URLs. I started off using Express' static file serving functionality for testing purposes. This was no longer an option when I deployed using Vercel's serverless function deployment option. It was the simplest and fastest option I could find, but this meant I could no longer store uploads as static files on the server. Vercel serverless functions are also limited to a maximum size of 4.5MB for the request body, and since this isn't a practical limit for most 3D models, client-side uploads were the way to go.

## PostgreSQL Database

I chose Postgres because I've used it before. I also don't have too many database projects under my belt, so I wanted to go with a tried and true relational database rather than being hip and trying out a NoSQL database. 

Postgres was nice because it provides full text search, which made it easy to implement searching in the app.

## Express Backend

I chose Express because it was easy to learn and use. The backend is essentially a middleman between the client and the database/S3. A very simple authentication system is implemented using bcrypt for encryption and cookies for managing user sessions. 

I chose not to use an ORM because I wanted to learn more SQL.
