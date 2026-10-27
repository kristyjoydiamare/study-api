const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Maria", course: "BSIT" },
    { id: 2, name: "Juan", course: "BSCS" }
];

let nextId = 3;

// GET ALL STUDENTS
app.get("/", (req, res) => {
    res.send("Student API is running!");
});

// GET ONE STUDENT
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

// CREATE STUDENT
app.post("/api/students", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const student = { id: nextId++, name, course };
    students.push(student);

    res.status(201).json(student);
});

// UPDATE STUDENT
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    student.name = name;
    student.course = course;

    res.status(200).json(student);
});

// DELETE STUDENT
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.status(204).send();
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});