import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getLinks, getTags } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { CreateTag, CreateLink } from "./";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "repeat(10, 1fr)",
  },
  mainPaper: {
    width: "70%",
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

  return (
    <div className={classes.container}>
      <Paper className={classes.mainPaper} elevation={3}>
        <CreateTag setTags={setTags} />
        <CreateLink tags={tags} />
      </Paper>
    </div>
  );
};

export default App;
