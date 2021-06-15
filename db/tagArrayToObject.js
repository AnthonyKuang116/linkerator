function tagArrayToObject(arrayedTags) {
  const objectTags = [];
  let tempArray = [];
  try {
    arrayedTags.forEach((arrayTag) => {
      if (!objectTags.find((t) => t.id == arrayTag.id)) {
        let { id, tagName } = arrayTag;
        tempArray = arrayedTags.filter((at) => at.id == arrayTag.id);
        let links = [];
        tempArray.forEach((at) => {
          links.push({
            id: at.linkId,
            link: at.link,
            clickCount: at.clickCount,
            dateShared: at.dateShared,
          });
        });
        objectTags.push({
          id,
          tagName,
          links,
        });
      }
    });

    return objectTags;
  } catch (error) {
    throw error;
  }
}

module.exports = tagArrayToObject;
