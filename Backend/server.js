import express from "express"; // Importing the Express framework to create a web server
import cors from "cors"; // Importing CORS middleware to allow cross-origin requests
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file
import  connectDb  from "./config/Db.js";
import  userRoutes from "./routes/UserRoutes.js"
import cookieParser from "cookie-parser";
const app = express(); // Creating an instance of an Express application


app.use(express.json()); // Middleware to parse incoming JSON requests and make the data available in req.body
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing (CORS), allowing frontend apps from different origins to access the backen
app.use(cookieParser())
const PORT  = 3000
dotenv.config();
connectDb();
app.get("/", (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BuzzTalk</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f4f8;
          text-align: center;
          padding: 50px;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to BuzzTalk App</h1>
      <p>Your place to chat, connect, and vibe with friends in real-time.</p>
    </body>
    </html>
  `);
});
//API Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Sever is Running on ${PORT}`);
});