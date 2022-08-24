const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// GETTING ALL USERS

router.get("/", middleware, (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GETTING A SINGLE USER

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users WHERE user_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// ADDING A USER

router.post("/", (req, res) => {
  const { full_name, user_email, user_password, user_type } = req.body;
  try {
    con.query(
      `INSERT INTO users (full_name,user_email,user_password,user_type) VALUES ('${full_name}','${user_email}','${user_password}','${user_type}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// EDITING A USER

router.put("/:id", (req, res) => {
  const { full_name, user_email, user_password, user_type } = req.body;
  try {
    con.query(
      `UPDATE users SET full_name='${full_name}', user_email='${user_email}', user_password='${user_password}', user_type='${user_type}' WHERE user_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// DELETING A USER

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE user_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;

// REGISTER ROUTE

router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const { full_name, user_email, user_password, user_type } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user_password, salt);

    let user = {
      full_name,
      user_email,
      user_password: hash,
      user_type,
    };

    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(
        `User ${(user.full_name, user.user_email)} was created successfully`
      );
    });
  } catch (error) {
    console.log(error);
  }
});

// LOGIN ROUTE

router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      user_email: req.body.user_email,
    };

    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const matching = await bcrypt.compare(
          req.body.user_password,
          result[0].user_password
        );

        if (!matching) {
          res.send("Password Incorrect");
        } else {
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              user_email: result[0].user_email,
              user_type: result[0].user_type,
            },
          };

          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// VERIFY ROUTE

router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorised Access!",
      });
    } else {
      res.status(200).send(decodedToken);
    }
  });
});
