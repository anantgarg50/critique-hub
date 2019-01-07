const router = require("express").Router();
const loginValidator = require("./../validators/common").login;
const { login } = require("../controllers/common");

router.post("/login", loginValidator, login);

module.exports = router;
