import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { getLinks } from "../api";

const App = () => {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState([]);

  useEffect(() => {
    getLinks()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
