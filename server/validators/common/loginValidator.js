const Joi = require("joi");

const schema = {
  email: Joi.string().required().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  password: Joi.string().required()
};

module.exports = (req, res, next) => {
  Joi.validate(req.body, schema)
    .then(() => {
      next();
    })
    .catch((err) => {
      let errorMessage;

      switch (err.details[0].context.key) {
        case "email":
          if (err.details[0].context.value == null) {
            errorMessage = "E-mail is required.";
          } else {
            errorMessage = "E-mail must be valid.";
          }
          break;
        case "password":
          if (err.details[0].context.value == null) {
            errorMessage = "Password is required."
          }
          break;
        default:
          errorMessage = "Invalid Information.";
      }

      res.status(400).send({
        error: errorMessage
      });
    })
}
