import express from "express";
import userHandler from "./handlers/user.handler.js";
import studentHandler from "./handlers/student.handler.js";
import adminHandler from "./handlers/admin.handler.js";
import courseHandler from "./handlers/course.handler.js";
import facultyHandler from "./handlers/faculty.handler.js";
import { connectDB } from "./db/connect.js";

const app = express();

app.use(express.json());
app.use("/user", userHandler);
app.use("/students", studentHandler);
app.use("/course", courseHandler);
app.use("/admin", adminHandler);
app.use("/faculty", facultyHandler);

const port = 3000;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
