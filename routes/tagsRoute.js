const { Router } = require("express");
const apiGetTags = require("./apiGetTags");
const apiCreateTags = require("./apiCreateTags");
const apiGetLinksByTagName = require("./apiGetLinksByTagName");
const tagsRouter = Router();

tagsRouter.get("/", apiGetTags);
tagsRouter.post("/", apiCreateTags);
tagsRouter.get("/:tagname/links", apiGetLinksByTagName);

module.exports = tagsRouter;
