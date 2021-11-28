const express = require('express');
const router = express.Router();

/* 
🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 
Setup your back-end routing
🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 🎙 
*/

router.get('/screenshots', (req, res) => {
    res.json({
        screenshots: []
    })
});

router.post('/screenshot', (req, res) => {
    console.log(req.body)
    res.json({
        screenshotUrl: "url"
    })
});

module.exports = router;
