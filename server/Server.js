const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
let user_id;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pwd_mgr"
})


app.post('/addItem', (req, res) => {
    console.log(user_id);
    const sql = "INSERT INTO password (`user_id`, `name`, `URL`, `username`,`password`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        user_id,
        req.body.name,
        req.body.URL,
        req.body.username,
        req.body.password
    ];
    
    console.log(values);
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log("Error:" + err.message);
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user WHERE `email` = ?";
    user_id
    db.query(sql, [email], (err, data) => {
        user_id = data[0].id;
        // console.log(user_id);
        // console.log(data);
        if (err) {
            return res.status(500).json("Error");
        }
        if(data.length > 0) {
            bcrypt.compare(password, data[0].password, (err, result) => {
                if (result) {
                    // Passwords match
                    return res.json("Success");
                } else {
                    // Passwords don't match
                    return res.json("Fail");
                }
            });
        } else {
            return res.json("Fail");
        }
    });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log("Error hashing password:" + err.message);
            return res.status(500).json(err.message);
        }

        const sql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [username, email, hash]; // Use the hash instead of the password

        db.query(sql, values, (err, data) => {
            if (err) {
                console.log("Error:" + err.message);
                return res.status(500).json(err.message);
            }
            return res.json("Success");
        });
    });
});

app.listen(8080, () =>{
    console.log("listenting");
})