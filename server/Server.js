const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
const app = express();
let user_id;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userID",
    secret: "This is my seceret for the cookies 1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expries: 60 * 60,
    },
  })
);
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pwd_mgr",
});

app.post("/addItem", (req, res) => {
  console.log(user_id);
  const sql =
    "INSERT INTO password (`user_id`, `name`, `URL`, `username`,`password`) VALUES (?, ?, ?, ?, ?)";
  const values = [
    user_id,
    req.body.name,
    req.body.URL,
    req.body.username,
    req.body.password,
  ];

  console.log(values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log("Error:" + err.message);
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE `email` = ?";
  user_id;
  db.query(sql, [email], (err, data) => {
    user_id = data[0].id;
    // console.log(user_id);
    // console.log(data);
    if (err) {
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (response) {
          req.session.user = data;
          console.log(req.session.user);
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

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error hashing password:" + err.message);
      return res.json(err.message);
    }

    const sql =
      "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [username, email, hash]; // Use the hash instead of the password

    db.query(sql, values, (err, data) => {
      if (err) {
        console.log("Error:" + err.message);
        return res.json(err.message);
      }
      return res.json("Success");
    });
  });
});

app.listen(8080, () => {
  console.log("listenting");
});
