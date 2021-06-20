import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { createLink } from "../api";
import Typography from "@material-ui/core/Typography";

// import { getLinks } from "../api";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import { red } from "@material-ui/core/colors";
// import Autocomplete from "@material-ui/lab/Autocomplete";

import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  form: {
    gridColumn: "1/10",
    gridRow: "2/3",
    margin: theme.spacing(1),
    width: "90%",
    minHeight: "20rem",
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
  typography: {
    marginTop: "20px",
    marginLeft: "10px",
    fontWeight: "bolder",
  },
}));

const CreateLink = () => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [createMessage, setCreateMessage] = useState("");
  const linkRef = useRef(null);
  const tagRef = useRef(null);
  const [popOverMst, setPopOverMsg] = useState("");

  const handleFormSubmit = async (e) => {
    console.log(e.target.value);
  };

  const handleLinkCreateClick = (e) => {
    if (!link) {
      setAnchorEl(linkRef.current);
      setPopOverMsg("Link field can not be empty.");
      return;
    }
    if (!newTags.join(",")) {
      setAnchorEl(tagRef.current);
      setPopOverMsg("Tag field can not be empty.");
      return;
    }
    createLink({ link, comment, tags: newTags })
      .then((response) => {
        if (response.name === "error") {
          throw Error(response.message);
          return;
        }
        setCreateMessage("Link created successfuly!");
        setLink("");
        setNewTags([]);
      })
      .catch((error) => setCreateMessage(error.message));
  };
  const handleLinkChange = async (e) => {
    setLink(e.target.value);
    if (createMessage) {
      setCreateMessage("");
    }
  };
  const handCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handTagsChange = (e) => {
    setNewTags(e.target.value.split(","));
    if (createMessage) {
      setCreateMessage("");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? anchorEl : undefined;
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className={classes.form}
        validate
        autoComplete="off"
      >
        <Typography variant="h5" gutterBottom className={classes.typography}>
          Create a new Link:
        </Typography>

        <TextField
          className={classes.textField}
          id="txt-link"
          label="Link"
          onChange={handleLinkChange}
          value={link}
          ref={linkRef}
        />

        <TextField
          className={classes.textField}
          id="txt-comment"
          label="Link Comment"
          onChange={handCommentChange}
          value={comment}
        />

        <TextField
          className={classes.textField}
          id="txt-tags"
          label="Enter Tags separted by comma(,)"
          onChange={handTagsChange}
          value={newTags.join(",")}
          ref={tagRef}
        />

        {/* <Autocomplete
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
            label="You can select tags from existing tags list"
            placeholder="Favorites"
          />
        )}
      /> */}
        <Button
          variant="contained"
          color="primary"
          id="btn-create-link"
          style={{
            height: "50px",
            margin: "10px 0",
            width: "20%",
            alignSelf: "center",
          }}
          onClick={handleLinkCreateClick}
        >
          Create
        </Button>

        <Typography className={classes.typography}>{createMessage}</Typography>
      </form>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>{popOverMst}</Typography>
      </Popover>
    </>
  );
};

export default CreateLink;
