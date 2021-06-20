import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  root: {
    gridRow: "3/4",
    gridColumn: "2/10",
    width: "100%",
    backgroundColor: "#fefae0ff",
    display: "flex",
    flexFlow: "row",
    marginBottom: "1rem",
    paddingTop: "",
  },
  form: {
    width: "100%",
    paddingTop: "1.5rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textFieldStyle: {
    width: "30rem",
  },
}));

const Search = ({ currentSearchText, handleSearchTextChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Search By
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={1}
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={10}></MenuItem>
            <MenuItem value={1}>By Link</MenuItem>
            <MenuItem value={2}>By Tag</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="filled-basic"
          className={classes.textFieldStyle}
          label="Type your search text here."
          variant="filled"
          value={currentSearchText}
          onChange={(e) => handleSearchTextChange(e)}
        />
      </form>
    </div>
  );
};

export default Search;
