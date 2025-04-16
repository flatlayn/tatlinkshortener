const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET/:code
// @desc    Redirect to the original URL
router.get(':/code', async (req,res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code}).exec();

        if (url) {
            return res.redirect((url.longUrl));
        } else {
            return res.status(404).json('No Url found.');
        }
    } catch (err) {
        res.status(500).json('Server error.')
    }
})

module.exports = router;