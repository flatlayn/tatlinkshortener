const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Creates short url
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseURL')

    // Check base Url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL.');
    }

    // Create URL Code
    const urlCode = shortId().generate();

    // Check long Url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl}).exec();

            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error.');
        }
    } else {
        res.status(401).json('Invalid long URL');
    }
})

module.exports = router;