import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }

    // for post
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    // for get
    const [students, setStudents] = useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const student = { name, address }

        fetch("http://localhost:8080/students/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New Student Added!");
            // Clear the input fields after adding a student
            setName('');
            setAddress('');

            fetch("http://localhost:8080/students/get-all")
                .then(res => res.json())
                .then((result) => {
                    setStudents(result);
                });
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/students/get-all")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            })
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "red" }}>Add a new Student</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    <Button variant="contained" onClick={handleClick}>Add</Button>
                </Box>
            </Paper>

            <h1>Students</h1>
            <Paper elevation={3} style={{ padding: '30px 20px', margin: "20px auto" }}>
                {students.map(student => (
                    <Paper elevation={6} style={paperStyle} key={student.id}>
                        Name: {student.name} <br />
                        Address: {student.address}
                    </Paper>
                ))}
            </Paper>
        </Container >
    );
}