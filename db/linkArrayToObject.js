function linkArrayToObject(arrayedLinks) {
  const objectLinks = [];
  let tempArray = [];
  console.log(arrayedLinks);
  try {
    arrayedLinks?.forEach((linkRow) => {
      if (!objectLinks.find((t) => t.id == linkRow.id)) {
        let { id, link, comment, dateShared, clickCount } = linkRow;
        tempArray = arrayedLinks.filter((arl) => arl.id == linkRow.id);
        let tags = [];
        tempArray.forEach((tr) => {
          tags.push({
            id: tr.tagId,
            name: tr.tagName,
          });
        });
        objectLinks.push({
          id,
          link,
          comment,
          dateShared,
          clickCount,
          tags,
        });
      }
    });

    return objectLinks;
  } catch (error) {
    throw error;
  }
}

module.exports = linkArrayToObject;
