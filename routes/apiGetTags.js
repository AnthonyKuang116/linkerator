const { getAllTags } = require("../db/index");

const apiGetTags = async (req, res, next) => {
  try {
    const tags = await getAllTags();

    res.send(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = apiGetTags;
