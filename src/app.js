const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shubham Kareer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shubham Kareer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Shubham Kareer",
    message: "Welcome to help section",
  });
});

//app.com -> after setting the publicDirectoryPath app.com now will be server from the app.use , not from app.get("") which has empty route below, so we will comment it
//app.com/help => shared by publicDirectory now
//app.com/about > shared by publicDirectory now
//app.com/weather

// app.get("", (req, res) => {
//   //res.send("Hello Express");
//   res.send("<h1>Weather App</h1>");
// });

// app.get("/help", (req, res) => {
//   //res.send("Help Page");
//   res.send([
//     { name: "Sarah", age: 24 },
//     {
//       name: "John",
//       age: 12,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address ",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shubham Kareer",
    errorMessage: "Help page article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shubham Kareer",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});