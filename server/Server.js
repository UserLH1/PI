const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pwd_mgr"
})


app.post('/addItem', (req, res) => {

    const sql = "INSERT INTO password (`user_id`,`folder_id`, `name`, `URL`, `username`,`password`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        1,
        1,
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
    const sql = "SELECT * FROM user WHERE `email`= ? AND `password` = ?";
   
    console.log(req.body.email);
    
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        console.log(data)
        if (err) {
            return res.json("Error");
        }
        if(data!=0)
        {
            return res.json("Succes");
        }
        else{
            return res.json("Fail");
        }
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    
    console.log(values);
    
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.listen(8080, () =>{
    console.log("listenting");
})