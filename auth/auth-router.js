const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { validateUser } = require("../users/users-helper.js");

//endpoints

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Auth endpoint /api/auth is running`
  });
});
router.post("/register", (req, res) => {
  let user = req.body;

  const validatedResult = validateUser(user);

  if (validatedResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      messag: "Invalid info about user ",
      errors: validatedResult.errors
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.find({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);

        res.status(200).json({
          message: `Welcome ${user.username}! A token has been issued ...`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Creditials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Error: ${error}` });
    });
});

const getJwtToken = username => {
  const payload = {
    username
  };

  const secret = process.env.JWT_SECRET || "secret";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
};
module.exports = router;
