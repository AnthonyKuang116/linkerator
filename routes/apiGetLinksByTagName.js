const { getLinksByTagName } = require("../db/index");

const apiGetLinksByTagName = async (req, res, next) => {
  const tagname = req.params;
  console.log(tagname);
  try {
    const tags = await getLinksByTagName(tagname);
    res.send(tags);
    console.log(tags);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = apiGetLinksByTagName;
