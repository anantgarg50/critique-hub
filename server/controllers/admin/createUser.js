const User = require("../../database/models/user");

module.exports = (req, res) => {
  console.log("controller");
  User.create(req.body)
    .then(() => {
      res.send({
        message: "Registration Success!"
      })
    })
    .catch((err) => {
      let errorMessage;

      if (err.code === 11000) {
        let field = err.message.split(".")[1];
        field = field.split(": ")[1];
        field = field.substring(0, field.lastIndexOf("_"));

        switch (field) {
          case "email":
            errorMessage = "E-mail is already registered!"
            break;
          case "username":
            errorMessage = "Username is already registered!"
            break;
          case "phone":
            errorMessage = "Phone is already registered!"
            break;
          default:
            errorMessage = err.message;
        }
      } else {
        errorMessage = err.message;
      }

      res.status(400).send({
        error: errorMessage
      });
    })
}
