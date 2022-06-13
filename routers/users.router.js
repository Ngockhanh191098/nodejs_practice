const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const dbConfig = require('../config/db');


const mysql = require('mysql2');
const e = require('express');

// create the connection to database
const connection = mysql.createConnection(dbConfig);

const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    const queryStmt = "SELECT * FROM `users`;";
    connection.query(queryStmt,function(err, results, fields) {
            res.json(results);
        }
    );
})

// Get user with username
router.get('/user', (req, res) => {
    const searchUsername = req.query.username;
    const queryStmt = `SELECT * FROM users WHERE username='${searchUsername}';`;
    connection.query( queryStmt, function(err, results, fields) {
            res.json(results);
        });
})

// create new user
router.post('/',jsonParser, (req, res) => {
    const data = req.body;
    const queryStmt = `INSERT INTO users (username, fullname, email, address, phone) 
    VALUES ("${data.username}","${data.fullname}","${data.email}","${data.address}","${data.phone}");`;
    connection.query( queryStmt,function(err, results, fields) {
        res.json('Post user success!');
    });
});

// Update user
router.put('/update/:id', jsonParser, (req, res) => {
    const idUser = req.params.id;
    const data = req.body;
    const queryStmt = `UPDATE users
    SET username = "${data.username}", fullname = "${data.fullname}", email = "${data.email}", address = "${data.address}", phone = "${data.phone}"
    WHERE id = ${idUser};`;
    connection.query( queryStmt,function(err, results, fields) {
        res.json('Update user success!');
    });
});

// Delete User
router.delete('/delete/:id', jsonParser, (req, res) => {
    const idUser = req.params.id;
    const queryStmt = `DELETE FROM users WHERE id= ${idUser};`;
    connection.query( queryStmt,function(err, results, fields) {
        res.json('Deleted user success!');
    });
});

module.exports = router;