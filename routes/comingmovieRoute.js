const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GETTING ALL MOVIES

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM coming_movies", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// ADDING A MOVIE

router.post("/", (req, res) => {
  const {
    movie_name,
    movie_genre,
    movie_poster,
    release_date,
  } = req.body;
  try {
    con.query(
      `INSERT INTO coming_movies (movie_name,movie_genre,movie_poster,release_date) VALUES ('${movie_name}','${movie_genre}','${movie_poster}','${release_date}')`,
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
    movie_genre,
    movie_poster,
    release_date,
  } = req.body;
  try {
    con.query(
      `UPDATE coming_movies SET movie_name='${movie_name}', movie_genre='${movie_genre}', movie_poster='${movie_poster}', release_date='${release_date}' WHERE movie_id=${req.params.id}`,
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
      `DELETE FROM coming_movies WHERE movie_id=${req.params.id}`,
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
