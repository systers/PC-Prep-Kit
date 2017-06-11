const express = require('express');
const passport = require('passport');
const router = express.Router();

//router.use(passport.authenticate('bearer', { session: false }));

/* GET api listing. */
router.get('/getUserInfo', (req, res) => {
	res.status(200).json({"user": req.user});
});


module.exports = router;