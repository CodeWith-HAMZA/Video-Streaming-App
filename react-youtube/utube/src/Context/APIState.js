import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "./Context";

const APIState = ({ children }) => {
  // * Videos-State
  const [Videos, setVideos] = useState(null);

  // * Video-Content-Category-State
  const [SelectedCategory, setSelectedCategory] = useState("CodeWithHarry");

  // * Top-Red-Loading-Bar State
  const [TopLoadingProgress, setTopLoadingProgress] = useState(0);

  // * Holding The Maximum-Video-Items, (Used In The Query-Parameter Of The [_API_])
  const [MaxResults, setMaxResults] = useState(50);

  // * Holding THe Next-Page-Token Of The Current One
  const [PageToken, setPageToken] = useState(null);

  // * Circular Infinite-Progress-Bar loading...
  const [IsLoading, setIsLoading] = useState(false)
  // * When-Ever The State Changes, Re-Call The API And Get Updated-Data
  const FetchVideosThroughSearch = async (searchQuery) => {
    setTopLoadingProgress(10);
    const data = await FetchAPI(
      `search?part=snippet&q=${searchQuery}&maxResults=${MaxResults.toString()}`
    );
    setVideos(data);
    setTopLoadingProgress(100);
  };

  // * Changing The Main State "Videos" On Searching The String (Now, It is Not-Used)
  // // const Search = async ({ current: { value } }) => {
  // //   const data = await FetchAPI(
  // //     `search?part=snippet&q=${value}&maxResults=${"30"}`
  // //   );
  // //   setVideos(data);
  // // };

  return (
    <Context.Provider
      value={{
        Videos,
        setVideos,
        SelectedCategory,
        setSelectedCategory, 
        FetchVideosThroughSearch,
        TopLoadingProgress,
        setTopLoadingProgress,
        MaxResults,
        setMaxResults,
        PageToken,
        setPageToken,
        IsLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default APIState;
