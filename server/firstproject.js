const express = require('express');
// const http = require('http');
const mysql = require('mysql2');
var cors = require('cors')
const bodyParser = require('body-parser');


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'my_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
})

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));

app.get('/createdb', (req, res) => {
    let sql = 'Create database if not exists my_db';
    sql = `CREATE TABLE user (
        userid int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255),
        password varchar(255),
        address varchar(255),
        inputcity varchar(255),
        inputstate varchar(255),
        inputzip varchar(255)
        PRIMARY KEY (userid)
    );`
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send('Database created');

    });
});

app.post('/insertData', (req, res) => {
    console.log('called--->', req.body);
    let insertSql = "insert into user (name, email, password, address, inputcity, inputstate, inputzip) values ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.password + "','" + req.body.address + "','" + req.body.city + "','" + req.body.state + "','" + req.body.zip + "');"

    console.log('InsertSql--->', insertSql);
    db.query(insertSql, (err, result) => {
        if (err) res.status(500);
        console.log(result);
        res.status(200).json({
            message: "Form data saved."
        });
    });
});

app.get('/getAllUser/:id?', (req, res) => {
    let sql = "select * from user;";
    if (req.params && req.params.id) {
        sql = `select * from user where userid=${req.params.id}`;
    }
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
        console.log('Rows-->', result);
        res.status(200).json({
            data: result
        });
    });
});

app.put('/updateName', (req, res) => {
    console.log('Req body-->', req.body);
    let sql = `update user set name = '${req.body.name}' where userid = ${req.body.userid};`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
        console.log('Rows-->', result);
        res.status(200).json(result);
    });
});

app.delete('/deleteUserById/:id', (req, res) => {
    console.log('Req query-->', req.params);
    let sql = `delete from user where userid=${req.params.id};`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
        console.log('Rows-->', result);
        res.status(200).json({
            message: 'Deleted successfully'
        });
    });
});

app.listen('3000', () => {
    console.log('server started on port 3000');
});