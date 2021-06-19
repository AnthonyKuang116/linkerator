import React, { useState, useEffect } from "react";
import { getLinks } from "../api";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import { createLink } from "../api";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles((theme) => ({
  form: {
    gridColumn: "6/10",
    gridRow: "2/3",
    margin: theme.spacing(1),
    width: "90%",
    height: "300px",
    display: "flex",
    flexFlow: "column nowrap",
    border: "2px solid #d4a373ff",
    padding: ".5rem",
    borderRadius: "5px",
    backgroundColor: "#fefae0ff",
    justifyContent: "space-around",
    justifySelf: "right",

    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(100),
    //   height: theme.spacing(100),
    // },
  },
  textField: {
    margin: theme.spacing(1),
    color: "#ccd5aeff",
    width: "90%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 115,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateLink = ({ tags }) => {
  const classes = useStyles();
  const [tagIds, setSelectedTags] = useState("");
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");

  const handleFormSubmit = async (e) => {
    console.log(e.target.value);
  };

  const handleLinkCreateClick = async (e) => {
    console.log({ tagIds, link, comment });
    // createLink({ link, comment, tagIds }).then((response) =>
    //   console.log(response)
    // );
  };
  const handleLinkChange = async (e) => {
    setLink(e.target.value);
  };
  const handCommentChange = (e) => {
    setComment(e.target.value);
  };
  console.log(tags);
  console.log(tagIds);
  return (
    <form
      onSubmit={handleFormSubmit}
      className={classes.form}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" gutterBottom>
        Create a new Link:
      </Typography>

      <Autocomplete
        multiple
        id="tags-standard"
        filterSelectedOptions
        options={tags}
        getOptionLabel={(option) => option?.tagName}
        onChange={(event, newValue) => {
          let tagsIdArray = [];
          newValue.forEach((tag) => tagsIdArray.push(tag.id));
          setSelectedTags([...tagsIdArray]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      <TextField
        className={classes.textField}
        id="standard-basic"
        label="Link"
        onChange={handleLinkChange}
        value={link}
      />

      <TextField
        className={classes.textField}
        id="standard-basic"
        label="Link Comment"
        onChange={handCommentChange}
        value={comment}
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
        onClick={handleLinkCreateClick}
      >
        Create
      </Button>
    </form>
  );
};

export default CreateLink;
