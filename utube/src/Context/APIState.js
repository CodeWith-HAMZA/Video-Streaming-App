import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "./Context";

const APIState = ({ children }) => {
  // * Videos-State
  const [Videos, setVideos] = useState(null);

  // * Video-Content-Category-State
  const [SelectedCategory, setSelectedCategory] = useState("Dear Sir");

  // * Top-Red-Loading-Bar State
  const [TopLoadingProgress, setTopLoadingProgress] = useState(0);

  // * When-Ever The State Changes, Re-Call The API And Get Updated-Data
  const FetchVideosThroughSearch = async (searchQuery) => {
    const data = await FetchAPI(
      `search?part=snippet&q=${searchQuery}&maxResults=${"50"}`
    );
    setVideos(data);
  };

  // * Changing The Main State "Videos" On Searching The String
  const Search = async ({ current: { value } }) => {
    setTopLoadingProgress(10);
    const data = await FetchAPI(
      `search?part=snippet&q=${value}&maxResults=${"30"}`
    );
    setVideos(data);
    setTopLoadingProgress(100);
  };

  return (
    <Context.Provider
      value={{
        Videos,
        setVideos,
        SelectedCategory,
        setSelectedCategory,
        Search,
        FetchVideosThroughSearch,
        TopLoadingProgress,
        setTopLoadingProgress,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default APIState;
