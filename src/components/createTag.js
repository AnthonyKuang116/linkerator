import React, { useState, useEffect } from "react";
import { getLinks } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { createTag } from "../api";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  form: {
    gridColumn: "1/5",
    gridRow: "3/4",
    margin: theme.spacing(1),
    marginTop: "80px",
    width: "90%",
    height: "300px",
    display: "flex",
    flexFlow: "column nowrap",
    border: "2px solid #d4a373ff",
    padding: ".5rem",
    borderRadius: "5px",
    backgroundColor: "#fefae0ff",
    justifyContent: "space-around",

    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(100),
    //   height: theme.spacing(100),
    // },
  },
  textField: {
    margin: "0",
    color: "#ccd5aeff",
    width: "90%",
  },
}));

const CreateTag = () => {
  const [message, setMessage] = useState("");
  const [tagName, setTagName] = useState("");
  const [links, setLinks] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getLinks()
      .then(({ allLinks }) => {
        console.log(allLinks);
        setLinks(allLinks);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  const handleTagClick = async (e) => {
    e.preventDefault();

    try {
      if (!tagName) {
        return;
      }
      const newTag = await createTag(tagName);
      console.log(newTag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async (e) => {
    console.log("submit..");
    e.preventDefaut();
    try {
      const newTag = await createTag(tagName);
      console.log(newTag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className={classes.form}
      noValidate
      autoComplete="off"
      style={{gridColumn: "2/6"}}
    >
      <Typography variant="h5" gutterBottom>
        Create New Tag:
      </Typography>
      <TextField
        className={classes.textField}
        id="standard-basic"
        label="Tag Name"
        onChange={handleTagNameChange}
      />

      <Button
        variant="contained"
        color="primary"
        style={{
          height: "50px",
          margin: "10px 0",
          width: "50%",
          alignSelf: "center",
        }}
        onClick={handleTagClick}
      >
        Create
      </Button>
    </form>
  );
};

export default CreateTag;
