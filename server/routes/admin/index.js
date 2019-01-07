const router = require("express").Router();

const adminValidators = require("../../validators/admin");
const adminControllers = require("../../controllers/admin");

router.post("/createUser", adminValidators.createUser, adminControllers.createUser);

module.exports = router;
