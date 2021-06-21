import React, { useState, useEffect } from "react";

import { getLinks, getTags, updateLinkClickCount, deleteLink } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { CreateLink, Search, ShowLinks } from "./";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
  },
  mainPaper: {
    width: "85%",
    height: "1120px",
    margin: "0 auto",
    gridColumn: "2/9",
    gridRow: "1/-1",
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
    backgroundColor: "#faedcdff",
  },
}));

const App = () => {
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentSearchText, setCurrentSearchText] = useState("");
  const [currentOption, setCurrentOption] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response.allLinks);
      })
      .catch((error) => {
        console.log(message);
        setMessage(error.message);
      });
  }, [links]);

  useEffect(() => {
    getTags()
      .then((tagsArray) => {
        setTags(tagsArray);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  const handleLinkClick = (id) => {
    try {
      updateLinkClickCount(id)
        .then((response) => {
          setLinks(response.update);
        })
        .catch((error) => {
          throw Error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const searchOptionChange = (event) => {
    setCurrentOption(event.target.value);
    console.log(event.target.value);
  };

  const handleSearchTextChanged = (name) => {
    setCurrentSearchText(name);
  };

  const handleLinkDelete = (link) => {
    deleteLink(link.id)
      .then((response) => setLinks(response.removeLink))
      .catch((error) => console.log(error));
  };

  const handleSearchTextChange = (e) => {
    setCurrentSearchText(e.currentTarget.value);
  };
  const getRowData = () => {
    let linksRows = [];
    if (currentOption === 0 && currentSearchText) {
      if (currentSearchText) {
        linksRows = links.filter((link) =>
          link.link.includes(currentSearchText)
        );
      }
      console.log(linksRows);
      return linksRows;
    } else {
      if (currentSearchText) {
        links.forEach((link) => {
          let tempArray = link.tags.filter((tag) => {
            return tag.name?.includes(currentSearchText);
          });

          if (tempArray?.length > 0) {
            linksRows.push(link);
          }
        });
        return linksRows;
      }
    }
    return links;
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.mainPaper} elevation={3}>
        <CreateLink setLinks={setLinks} />
        <Search
          currentSearchText={currentSearchText}
          handleSearchTextChange={handleSearchTextChange}
          searchOptionChange={searchOptionChange}
          currentOption={currentOption}
        />
        <ShowLinks
          rows={getRowData()}
          handleLinkClick={handleLinkClick}
          setCurrentSearchText={setCurrentSearchText}
          currentSearchText={currentSearchText}
          handleSearchTextChanged={handleSearchTextChanged}
          handleLinkDelete={handleLinkDelete}
        />
      </Paper>
    </div>
  );
};

export default App;
