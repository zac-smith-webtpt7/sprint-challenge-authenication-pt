const axios = require("axios");

const router = require("express").Router();

// TEST endpoint to show error 'shall not pass'
router.get("/running", (req, res) => {
  res.status(200).json({
    message: `Jokes endpoint /api/jokes/running is working`
  });
});

router.get("/", (req, res) => {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
});

module.exports = router;
