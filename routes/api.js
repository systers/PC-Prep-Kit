const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/getUserInfo', (req, res) => {
    res.status(200).json({user: req.user});
});

module.exports = router;

