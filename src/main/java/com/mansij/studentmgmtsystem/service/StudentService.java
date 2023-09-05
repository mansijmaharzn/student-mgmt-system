package com.mansij.studentmgmtsystem.service;

import com.mansij.studentmgmtsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);

    public List<Student> getAllStudents();
}
