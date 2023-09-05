package com.mansij.studentmgmtsystem.controller;

import com.mansij.studentmgmtsystem.model.Student;
import com.mansij.studentmgmtsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;


    @GetMapping("get-all")
    public List<Student> getAll() {
        return studentService.getAllStudents();
    }

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "Student added!";
    }
}
