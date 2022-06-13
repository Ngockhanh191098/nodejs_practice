const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect database
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "customer"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// add user INTO database
app.post('/user', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;

    const query = `INSERT INTO users (username, pwd) VALUES ('${username}', '${pwd}')`;
    con.query(query, (err, result) => {
        if(err) throw err;
        res.json({message: "add user success!"})
    })
})

// update user
app.put('/user/update/:id', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    const id = req.params.id;

    const query = `UPDATE users
    SET username = '${username}', pwd= '${pwd}'
    WHERE id = ${id};`;
    con.query(query, (err, result) => {
        if(err) throw err;
        res.json({message: "update user success!"})
    })
})

app.delete('/user/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM users WHERE id = ${id}`;
    con.query(query, (err, result) => {
        if(err) throw err;
        res.json({message: "delete user success!"})
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

