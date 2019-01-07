const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  username: Joi.string(),
  email: Joi.string().required().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  password: Joi.string().required().min(8),
  phone: Joi.number().required().max(9999999999).min(1000000000),
  userAddress: Joi.object().keys({
    lineOne: Joi.string(),
    lineTwo: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string().required(),
    postalCode: Joi.number()
  }).required(),
  gender: Joi.string().valid("male", "female", "others"),
  dateOfBirth: Joi.date().max(Date.now()),
  bio: Joi.string(),
  interests: Joi.array().items(Joi.string()),
  expectationsFromCommunity: Joi.string(),
  status: Joi.string().valid("online", "offline", "verified", "unverified", "disabled", "deleted"),
  role: Joi.string().valid("user", "admin", "communityBuilder"),
  communities: Joi.array().items(Joi.objectId()),
  lastLogin: Joi.date()
};

module.exports = (req, res, next) => {
  Joi.validate(req.body, schema)
    .then(() => next())
    .catch((err) => {
      let errorMessage;

      switch (err.details[0].context.key) {
        case "firstName":
          errorMessage = "First Name is required.";
          break;
        case "email":
          if (err.details[0].context.value == null) {
            errorMessage = "E-mail is required.";
          } else {
            errorMessage = "E-mail must be valid.";
          }
          break;
        case "password":
          if (err.details[0].context.value == null) {
            errorMessage = "Password is required.";
          } else {
            errorMessage = "Password must be of minimum 8 characters.";
          }
          break;
        case "phone":
          if (err.details[0].context.value == null) {
            errorMessage = "Phone number is required.";
          } else {
            errorMessage = "Phone Number must be of exactly 10 digits.";
          }
          break;
        case "country":
          errorMessage = "Country is required field."
          break;
        default:
          errorMessage = "Invalid Information.";
      }

      res.status(400).send({ error: errorMessage });
    })
}
