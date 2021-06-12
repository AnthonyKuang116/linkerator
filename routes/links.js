const express = require('express');
const linksRouter = express.Router();

const {createLink, getAllLinks} = require('../db');

linksRouter.use((req, res, next) => {
    console.log("A request is being made to /links");
    next();
});

linksRouter.get('/', async (req, res, next) => {
    try {
        const allLinks = await getAllLinks();

        res.send({allLinks})
    } catch ({name, message}) {
        next({name ,message});
    }
});

linksRouter.post('/links', async (req, res, next) => {
    const {link, clickCount, comment, dateShared} = req.body;
    const linkDetails = req.user;
    const { setId } = linkDetails.id;
    const linkData = {};

    try {
        //adding link, clickCount, comment, dateShared, and linkId to linkData object
        linkData.link = link;
        linkData.clickCount = clickCount;
        linkData.comment = comment;
        linkData.dateShared = dateShared;
        linkData.linkId = setId;

        //creating link data
        const newLink = await createLink(linkData);

        res.send({newLink});

    } catch ({name, message}) {
        next({name, message});
    }
});

module.exports = linksRouter;