import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { createLink } from "../api";
import Typography from "@material-ui/core/Typography";

import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  form: {
    gridColumn: "2/10",
    gridRow: "2/3",
    margin: theme.spacing(1),
    width: "90%",
    minHeight: "20rem",
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
    border: "2px solid #d4a373ff",
    padding: ".5rem",
    marginRight: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    backgroundColor: "#fefae0ff",
    justifyContent: "space-around",
    justifySelf: "right",
  },
  textField: {
    margin: theme.spacing(1),
    color: "#ccd5aeff",
    width: "90%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "115",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  typography: {
    marginTop: "20px",
    marginLeft: "10px",
    marginBottom: "2px",
    fontWeight: "bolder",
  },
}));

const CreateLink = ({ setLinks }) => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [createMessage, setCreateMessage] = useState("");
  const linkRef = useRef(null);
  const tagRef = useRef(null);
  const [popOverMst, setPopOverMsg] = useState("");

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
        }
        setCreateMessage("Link created successfuly!");
        setLink("");
        setNewTags([]);
        setComment("");
        setLinks((links) => [response.newLink, ...links]);
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
      <form className={classes.form}>
        <Typography variant="h5" gutterBottom className={classes.typography}>
          Create a new Link:
        </Typography>

        <TextField
          className={classes.textField}
          onChange={handleLinkChange}
          value={link}
          ref={linkRef}
          id="txt-link"
          label="Link"
          variant="outlined"
        />

        <TextField
          className={classes.textField}
          id="txt-comment"
          label="Link Comment"
          onChange={handCommentChange}
          value={comment}
          variant="outlined"
        />

        <TextField
          className={classes.textField}
          id="txt-tags"
          label="Enter Tags separted by comma(,)"
          onChange={handTagsChange}
          value={newTags.join(",")}
          ref={tagRef}
          variant="outlined"
        />

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
