const User = require("../../database/models/user");

const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  User.checkPassword(req.body, (err, user) => {
    console.log(req.body);
    if (err) {
      if (err.status === 401) {
        res.status(401).send(err.message);
      } else {
        res.status(500).send("Internal server error! Please try again later.");
      }
    } else {
      user.password = null;

      let payload = {
        userId: user._id,
        role: user.role
      }

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.send({ token: token, user: user });
    }
  })
}
