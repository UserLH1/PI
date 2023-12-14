const express = require("express");
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
let user_id;
var session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
app.use(cors);
// app.use(
//   cors({
//     origin: "http://localhost:3000/", // replace with your front-end domain
//     credentials: true,
//   })
// );
app.use(express.json());

app.use(
  session({
    secret: "Secret de mutat in variabila de sistem.",
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "pwd_mgr",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using https
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pwd_mgr",
});

///PASSPORT
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const sql = "SELECT * FROM user WHERE `email` = ?";
    db.query(sql, [email], (err, users) => {
      if (err) {
        return done(err);
      }
      if (!users.length) {
        return done(null, false, { message: "No user found." });
      }

      const user = users[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect." });
        }
      });
    });
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [id], (err, users) => {
    if (err) {
      return done(err);
    }
    done(null, users[0]);
  });
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

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failed",
    failureFlash: true, // Optional, requires connect-flash
  }),
  (req, res) => {
    res.json("Success");
  }
);
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the dashboard." });
  console.log("succesful login");
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
app.post("/delete", (req, res) => {
  const passwordId = req.body.id;
  console.log(req.body.id);
  const sql = "DELETE FROM pas`sword WHERE `id` = ?";
  db.query(sql, [passwordId], (err, data) => {
    if (err) {
      console.log("Error deleting password:", err.message);
      return res.json({ error: "Failed to delete password" });
    }
    return res.json({ success: "Password deleted successfully" });
  });
});

app.listen(8080, () => {
  console.log("listening");
});
