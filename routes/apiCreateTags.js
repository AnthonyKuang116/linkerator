const { createTag } = require("../db/index");
const apiCreateTags = async (req, res, next) => {
  try {
    const name = req.body;
    console.log(name);
    const tag = await createTag(name);
    res.send(tag);
  } catch (error) {
    next(error);
  }
};

module.exports = apiCreateTags;
