import express from "express";
import cors from "cors";
import "express-async-errors";
import users from "./routes/users.mjs";
import tasks from "./routes/tasks.mjs";
import columns from "./routes/columns.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/users", users);
app.use("/tasks", tasks)
app.use("/columns", columns)

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});