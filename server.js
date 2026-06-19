

const express = require("express");

const axios = require("axios");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");

dotenv.config();


const { authSocket, socketServer } = require("./socketServer");

// Routes
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const incidents = require("./routes/incidentroutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const redalert = require("./routes/redalert");
const sos = require("./routes/sos");

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Create HTTP server and WebSocket server
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { 
    origin: [CLIENT_URL, "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST"]
  },
});

// Middleware
app.set("io",io);
app.use(express.json());
app.use(cors({ 
  origin: [CLIENT_URL, "http://localhost:3000", "http://localhost:3001"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// WebSocket Authentication & Connection Handling
io.use(authSocket);
io.on("connection", (socket) => {
  console.log(`✅ New WebSocket connection: ${socket.id}`);
  socketServer(socket);
});

// MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);
app.use("/api/incidents", incidents);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/redalert", redalert);
app.use("/api/sos", sos);



app.post("/api/chat", async (req, res) => {

  try {

    const { message } = req.body;

    console.log("📩 User Message:", message);

const response = await axios.post(

  "https://api.openai.com/v1/chat/completions",

  {
    model: "gpt-3.5-turbo",

    messages: [
      {
        role: "system",
        content:
          "You are SheCurity AI, a compassionate women's safety assistant."
      },
      {
        role: "user",
        content: message
      }
    ],

    temperature: 0.7,
    max_tokens: 200
  },

  {
    headers: {
      "Authorization":
        `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    }
  }
);

const data = response.data

    console.log("✅ OpenAI Response:", data);

    const reply =
      data.choices?.[0]?.message?.content
      || "No response";

    res.json({ reply });

  } catch (error) {

    console.error("❌ OpenAI Error:", error);

    res.status(500).json({
      reply: "AI server error",
    });
  }
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")));
}

// Start server
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Graceful shutdown handling (for production)
process.on("SIGINT", () => {
  console.log("❌ Server shutting down...");
  mongoose.connection.close(() => {
    console.log("✅ MongoDB disconnected");
    process.exit(0);
  });
});

