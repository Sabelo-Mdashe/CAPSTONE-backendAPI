const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GETTING ALL SERIES

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM series", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GETTING A SINGLE SERIES

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM series WHERE series_id=${req.params.id}`,
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

// ADDING A SERIES

router.post("/", (req, res) => {
  const {
    series_name,
    series_description,
    series_genre,
    series_poster,
    release_date,
    series_price,
    series_rating,
    background,
  } = req.body;
  try {
    con.query(
      `INSERT INTO series (series_name,series_description,series_genre,series_poster,release_date,series_price,series_rating,background) VALUES ('${series_name}','${series_description}','${series_genre}','${series_poster}','${release_date}','${series_price}','${series_rating}','${background}')`,
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

// EDITING A SERIES

router.put("/:id", (req, res) => {
  const {
    series_name,
    series_description,
    series_genre,
    series_poster,
    release_date,
    series_price,
    series_rating,
    background,
  } = req.body;
  try {
    con.query(
      `UPDATE series SET series_name='${series_name}', series_description='${series_description}', series_genre='${series_genre}', series_poster='${series_poster}', release_date='${release_date}', series_price='${series_price}', series_rating='${series_rating}', background='${background}' WHERE series_id=${req.params.id}`,
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

// DELETING A SERIES

router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM series WHERE series_id=${req.params.id}`,
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
