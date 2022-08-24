const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GETTING ALL USERS

router.get("/", (req, res) => {
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
