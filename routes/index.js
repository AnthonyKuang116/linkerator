const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

/*
**router pathways
*/
const linksRouter = require('./links');
apiRouter.use('/links', linksRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
})

module.exports = apiRouter;
