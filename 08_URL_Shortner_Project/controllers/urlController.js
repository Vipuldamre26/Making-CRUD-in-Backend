const URL = require('../models/url')
// const { nanoid } = require('nanoid');
const ShortUniqueId = require('short-unique-id');


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    const uid = new ShortUniqueId({ length: 8 });
    if(!body.url) return res.status(400).json({ error: 'url is required' })
    const shortID = uid.rnd();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortID });
}


module.exports = {
    handleGenerateNewShortUrl,
}

