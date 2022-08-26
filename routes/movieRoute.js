const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GETTING ALL MOVIES

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM movies", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GETTING A SINGLE MOVIE

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM movies WHERE movie_id=${req.params.id}`,
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

// ADDING A MOVIE

router.post("/", (req, res) => {
  const {
    movie_name,
    movie_description,
    movie_genre,
    movie_poster,
    release_date,
    movie_price,
    movie_rating,
    background,
  } = req.body;
  try {
    con.query(
      `INSERT INTO movies (movie_name,movie_description,movie_genre,movie_poster,release_date,movie_price,movie_rating,background) VALUES ('${movie_name}','${movie_description}','${movie_genre}','${movie_poster}','${release_date}','${movie_price}','${movie_rating}','${background}')`,
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

// EDITING A MOVIE

router.put("/:id", (req, res) => {
  const {
    movie_name,
    movie_description,
    movie_genre,
    movie_poster,
    release_date,
    movie_price,
    movie_rating,
    background,
  } = req.body;
  try {
    con.query(
      `UPDATE movies SET movie_name='${movie_name}', movie_description='${movie_description}', movie_genre='${movie_genre}', movie_poster='${movie_poster}', release_date='${release_date}', movie_price='${movie_price}', movie_rating='${movie_rating}', background='${background}' WHERE movie_id=${req.params.id}`,
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

// DELETING A MOVIE

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM movies WHERE movie_id=${req.params.id}`,
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
