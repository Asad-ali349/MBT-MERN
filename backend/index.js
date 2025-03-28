// Express.js is a free and open - source web application framework for Node.js.
// It is used for designing and building web applications quickly and easily.
import express from "express";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Body-parser is the Node. js body parsing middleware.
// It is responsible for parsing the incoming request bodies in a middleware before you handle it.
import bodyParser from "body-parser";

// Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

import cors from "cors";

// dotenv Loads environment variables from.env file.
import dotenv from "dotenv";

//routes importing
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import categoryRouter from "./routes/categories.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/orders.js";
import purchaseRouter from './routes/purchases.js';

import cloudinary from 'cloudinary';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'public')))
app.use('/static',express.static('public'))


// Returns middleware that only parses urlencoded bodies and
// only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({
  origin: '*'
}));


//Defining Port on which our page is load.
const PORT = process.env.PORT || 5000;

// use() function is used to mount the specified middleware function(s) at the path which is being specified.
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/purchase", purchaseRouter);

// app.use("/organization", organizationRouter);

// The app.get() responds with "Hello to ToDo App API" for requests to the root URL (/) or route.
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Mithu BBQ App API</h1>");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

mongoose.connect(process.env.CONNECTION_URL) 
.then(() => {
  server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})
.catch((err) => {
  console.log("Mongodb connection error", err);
});

// Make io accessible throughout the application
export { io };

export default app;
