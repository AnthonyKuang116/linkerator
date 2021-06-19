import React, { useState, useEffect } from "react";

import { getLinks, getTags, updateLinkClickCount, deleteLink } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { CreateLink, Search, ShowLinks } from "./";
import { response } from "express";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
  },
  mainPaper: {
    width: "80%",
    height: "99vh",
    margin: "0 auto",
    gridColumn: "2/9",
    gridRow: "1/-1",
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
    backgroundColor: "#faedcdff",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(100),
    //   height: theme.spacing(100),
    // },
  },
}));

const App = () => {
  const [message, setMessage] = useState("");
  const [tagName, setTagName] = useState("");
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentSearchText, setCurrentSearchText] = useState("");

  const classes = useStyles();

  useEffect(() => {
    getLinks()
      .then((response) => {
        console.log(response);
        setLinks(response.allLinks);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

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

  const handleSearchTextChanged = (name) => {
    setCurrentSearchText(name);
  };

  const handleLinkDelete = (link) => {
    deleteLink(link.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const getRowData = () => {
    console.log(links);
    let linksRows = [];
    if (currentSearchText) {
      links.forEach((link) => {
        let tempArray = link.tags.filter((tag) => {
          return tag.name?.includes(currentSearchText);
        });
        console.log(tempArray);
        if (tempArray?.length > 0) {
          linksRows.push(link);
        }
      });
      return linksRows;
    }
    return links;
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.mainPaper} elevation={3}>
        {/* <CreateTag setTags={setTags} /> */}
        <CreateLink tags={tags} />{" "}
        <Search currentSearchText={currentSearchText} />
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
