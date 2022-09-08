const express = require("express");
const cors = require("cors");

const app = express();
app.set("port", process.env.PORT || 2121);
app.use(express.json());
// app.use(cors());

app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(
  cors({
    // mode: "no-cors",
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/" + "index.html");
});

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});

// IMPORTING ROUTES

const userRoutes = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const seriesRoute = require("./routes/seriesRoute");
const comingmoviesRoute = require("./routes/comingmovieRoute");
const dealsRoute = require("./routes/dealsRoute");

// USING THE ROUTES

app.use("/users", userRoutes);
app.use("/movies", movieRoute);
app.use("/series", seriesRoute);
app.use("/coming", comingmoviesRoute);
app.use("/deals", dealsRoute);
