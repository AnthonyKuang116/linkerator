const express = require('express');
const linksRouter = express.Router();

const {createLink, getAllLinks, getLink} = require('../db');

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

linksRouter.get('/:linkId', async (req, res, next) => {
    const {linkId} = req.params; 
    console.log(linkId)
    try {
        const link = await getLink(linkId);
        res.send({link})
    } catch ({name, message}) {
        next({name, message});
    }
})

linksRouter.post('/', async (req, res, next) => {
    const {link, clickCount, comment, dateShared} = req.body;
    const linkDetails = req.user;
    const { setId } = linkDetails.id;
    const linkData = {};

    try {
        //adding link, clickCount, comment, dateShared, and tagId to linkData object
        linkData.link = link;
        linkData.clickCount = clickCount;
        linkData.comment = comment;
        linkData.dateShared = dateShared;
        linkData.tagId = setId;

        //creating link data
        const newLink = await createLink(linkData);

        res.send({newLink});

    } catch ({name, message}) {
        next({name, message});
    }
});

module.exports = linksRouter;