const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
const { google } = require("googleapis");
const app = express();
require("dotenv").config({ path: ".env.local" });

//////////////////////Smtp//////////////
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, username) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "lazeahoratiu@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Encoding the email
    const encodedEmail = encodeURIComponent(
      Buffer.from(email).toString("base64")
    );

    const mailOptions = {
      from: "Lock Box <lazeahoratiu@gmail.com>",
      to: email,
      subject: "Please Confirm Your Email Address",
      html: `
        <div style="font-family: Arial, sans-serif; color: #444;">
          <h1 style="color: #0d6efd;">Welcome to Lock Box!</h1>
          <h2>Hello ${username},</h2>
          <p>Thank you for signing up with Lock Box. We're thrilled to have you with us!</p>
          <p>Please confirm your email address to get started with securing your digital life.</p>
          <a href="http://localhost:8080/confirm/${encodedEmail}" 
             style="background-color: #0d6efd; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Confirm Email
          </a>
          <p>If you did not sign up for a Lock Box account, please ignore this email or <a href="mailto:lazeahoratiu@gmail.com">contact support</a>.</p>
          <p style="margin-top: 20px;">Cheers,</p>
          <p>The Lock Box Team</p>
        </div>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));
////////////////////////////
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
          req.session.username = data;
          console.log(req.session.username);
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
  if (req.session.username) {
    res.send({ loggedIn: true, username: req.session.username });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error hashing password:", err.message);
      return res
        .status(500)
        .json({
          message: "Error while creating the account. Please try again.",
        });
    }

    const sql =
      "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [username, email, hash];

    db.query(sql, values, async (err, result) => {
      if (err) {
        console.log("Error:", err.message);
        // Check if the error is due to a duplicate email
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: `Email "${email}" is already taken` });
        } else {
          return res
            .status(500)
            .json({
              message: "Error while creating the account. Please try again.",
            });
        }
      }

      // Call sendMail here after the user is inserted into the database
      try {
        const emailResult = await sendMail(email, username);
        console.log("Email sent...", emailResult);
        res
          .status(200)
          .json({
            message:
              "Registration successful, please check your email to confirm your account.",
          });
      } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ message: "Error sending confirmation email" });
      }
    });
  });
});

app.get("/register", (req, res) => {
  if (req.session.username) {
    res.send({ loggedIn: true, username: req.session.username });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/confirm/:encodedEmail", async (req, res) => {
  try {
    // Decoding the email
    const email = Buffer.from(
      decodeURIComponent(req.params.encodedEmail),
      "base64"
    ).toString();

    const sql = "UPDATE user SET is_verified = TRUE WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error verifying email.");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found.");
      }

      // Redirect to the email-verified route in the React app
      res.redirect('http://localhost:3000/email-verified');
    });
  } catch (error) {
    res.status(400).send("Invalid or expired link.");
  }
});


app.post("/logout", (req, res) => {
  if (req.session) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // If there was an error destroying the session
        console.error("Error while logging out:", err);
        return res.status(500).send("Error while logging out.");
      }

      // Clear the session cookie
      res.clearCookie("userID"); // Replace with the name of your session cookie
      res.send("Logged out successfully");
    });
  } else {
    // If there was no session, just send a success response
    res.send("No active session. Logged out successfully.");
  }
});
// În serverul tău Express

app.get("/dashboard", (req, res) => {
  // presupunem că ai o metodă de a obține id-ul utilizatorului curent

  const sql = "SELECT is_verified FROM user WHERE id = ?";
  db.query(sql, user_id, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Server error");
    }
    if (result.length > 0) {
      res.json({ is_verified: result[0].is_verified });
    } else {
      res.status(404).send("User not found");
    }
  });
});

app.get('/getPasswords', (req, res) => {
  // Assuming you have authentication checks and user identification logic
 // Example of getting user ID from the session

  // Query the database for passwords where the user ID matches
  const query = 'SELECT name, URL, username, password FROM password WHERE user_id = ?';
  db.query(query, user_id, (err, results) => {
    if (err) {
      // Handle error
      console.error("Database error:", err);
      res.status(500).send("Error fetching passwords.");
    } else {
      // Send back the results
      res.json(results);
    }
  });
});


// ... [remaining code] ...

// app.get('/test', (req, res) => {
//   console.log("hello world");
//   res.send("Hello World");
// });

app.listen(8080, () => {
  console.log("listenting");
});
