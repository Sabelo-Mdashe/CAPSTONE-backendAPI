const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GETTING ALL MOVIE DEALS

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM movie_collections", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GETTING A SINGLE MOVIE COLLECTION

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM movie_collections WHERE movie_id=${req.params.id}`,
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

// ADDING A MOVIE COLLECTION

router.post("/", (req, res) => {
  const {
    movie_name,
    movie_description,
    movie_genre,
    movie_poster,
    release_date,
    movie_price,
    movie_parts,
  } = req.body;
  try {
    con.query(
      `INSERT INTO movie_collections (movie_name,movie_description,movie_genre,movie_poster,release_date,movie_price,movie_parts) VALUES ('${movie_name}','${movie_description}','${movie_genre}','${movie_poster}','${release_date}','${movie_price}','${movie_parts}')`,
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

// EDITING A MOVIE COLLECTION

router.put("/:id", (req, res) => {
  const {
    movie_name,
    movie_description,
    movie_genre,
    movie_poster,
    release_date,
    movie_price,
    movie_parts,
  } = req.body;
  try {
    con.query(
      `UPDATE movie_collections SET movie_name='${movie_name}', movie_description='${movie_description}', movie_genre='${movie_genre}', movie_poster='${movie_poster}', release_date='${release_date}', movie_price='${movie_price}', movie_parts='${movie_parts}' WHERE movie_id=${req.params.id}`,
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

// DELETING A MOVIE COLLECTION

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM movie_collections WHERE movie_id=${req.params.id}`,
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
