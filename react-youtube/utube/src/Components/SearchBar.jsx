import { Paper } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "../Context/Context";

const SearchBar = () => {
  const navigate = useNavigate();
  const { Search } = useContext(Context);

  const ref = useRef();

  const onInput = (e) => {
    console.log(ref.current.value);
  };

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
        // // bgcolor: { xs: "pink", sm: '#fff', md: 'red', xl: 'green', lg: "yellow" },
        // // p: "0 0.34rem 0.32rem 0.32rem",
        padding: "0.14rem",
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
          Search(ref);  // * Fetching The Data Related To Search-Query And Storing In The Videos-State
        }}
      />
    </Paper>
  );
};

export default SearchBar;
