const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hanlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Salwa Chen",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Salwa Chen",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "How can I help? ;)",
    title: "Help",
    name: "Salwa Chen",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send([
          {
            location,
            forecastData,
            address: req.query.address,
          },
        ]);
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
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    name: "Salwa Chen",
    error: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "Help",
    name: "Salwa Chen",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
