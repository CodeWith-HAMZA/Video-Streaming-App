import { Paper } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "../Context/Context";
import LoadingBar from "react-top-loading-bar";

const SearchBar = () => {
  const navigate = useNavigate();
  const { Search } = useContext(Context);
  const ref = useRef();

  const onInput = (e) => {
    console.log(ref.current.value);
  };
  document.addEventListener(
    "keypress",
    (e) => {
      // //  console.log(e.key === '/')

      // * On-Pressing 's' on keyboard character, focus on the search-bar(input-tag)
      if (e.key === "s") {
        ref.current.focus();
      }
    },
    false
  );

  return (
    // * Important-Information:-
    // * A paper is nothing but a <simple-div> that has some special properties
    <Paper
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search/${ref.current.value}`); // * Navigating Towards The Search-Component Route
        Search(ref);
      }}
      // square
      sx={{
        p: "0.14rem",
      }}
    >
      <input
        id="SEARCHBAR"
        type="text"
        ref={ref}
        onChange={onInput}
        style={{
          outline: "none",
          border: "none",
        }}
        placeholder="Search"
      />

      <SearchIcon
        style={{
          position: "relative",
          top: "3px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/search/${ref.current.value}`); // * Navigating Towards The Search-Component Route
          Search(ref); // * Fetching The Data Related To Search-Query And Storing In The Videos-State
        }}
      />
    </Paper>
  );
};

export default SearchBar;
