const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student",
    });
});

router.post("/", async (req, res) => {
    if (req.body._id == "") {
        await insertRecord(req, res);
    } else {
        await updateRecord(req, res);
    }
});

async function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    try {
        await student.save();
        res.redirect('student/list');
    } catch (err) {
        console.log("Error during insert: " + err);
    }
}

async function updateRecord(req, res) {
    try {
        await Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.redirect('student/list');
    } catch (err) {
        console.log("Error during update: " + err);
    }
}

router.get('/list', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('student/list', {
            list: students
        });
    } catch (err) {
        console.log("Error in retrieval: " + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render('student/addOrEdit', {
            viewTitle: 'Update Student',
            student: student
        });
        console.log(student);
    } catch (err) {
        console.log("Error in finding student: " + err);
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect("/student/list");
    } catch (err) {
        console.log("Error in deletion: " + err);
    }
});

module.exports = router;