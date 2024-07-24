const express = require('express');
const { handleGenerateNewShortUrl, handleRedirectURL } = require('../controllers/urlController')

const router = express.Router();

router.post('/', handleGenerateNewShortUrl)


module.exports = router;