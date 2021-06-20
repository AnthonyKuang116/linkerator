const { Router } = require("express");
const apiRouter = Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

/*
 **router pathways
 */
const linksRouter = require("./links");
apiRouter.use("/links", linksRouter);

const tagsRouter = require("./tagsRoute");
apiRouter.use("/tags", tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
