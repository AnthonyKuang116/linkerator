const express = require('express');
const linksRouter = express.Router();

const {createLink, getAllLinks, getLink, deleteLink, updateLink, findOrCreateTag} = require('../db');

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
    const {link, comment, tags = []} = req.body;
    console.log(req.body)
    try {
        //creating link data
        const newLink = await createLink({link, comment});

        // const tagPromises = tags.map(name => findOrCreateTag(name));
        // const tagObjects = await Promise.all(tagPromises);

        // //Associates tags with link 
        // newLink.tags = tagObjects;

        res.send({newLink});

    } catch ({name, message}) {
        next({name, message});
    }
});

linksRouter.delete('/:linkId', async (req, res, next) => {
    const {linkId} = req.params;
    try {
        const removeLink = await deleteLink(linkId)
        res.send({removeLink})
    } catch ({name, message}) {
        next({name, message});
    }
})

linksRouter.patch('/:linkId', async (req, res, next) => {
    const {linkId} = req.params;
    try {
        const update = await updateLink(linkId)
        res.send({update})
    } catch ({name, message}) {
        next({name, message});
    }
})

module.exports = linksRouter;