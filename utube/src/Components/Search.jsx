import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import VideosBox from "./VideosBox";
import Context from "../Context/Context";
import { useParams } from "react-router-dom";
const Search = () => {
  const { searchString } = useParams();
  const { Videos, setVideos, SelectedCategory, FetchVideosThroughSearch } =
    useContext(Context);

  const removeSpaces = (givenString) =>
    givenString
      .split(" ")
      .filter((elem) => elem != "")
      .join();

  useEffect(() => {
    // console.log("Runnig Search Comp USeefect")
    // (async () => {
    //   const data = await FetchAPI(
    //     `search?part=snippet&q=${searchString}&maxResults=${"50"}`
    //   );
    //   setVideos(data);
    // })();

    FetchVideosThroughSearch(removeSpaces(searchString));
  }, [ ]); // * Component Gets Updated On Changing The [query-search-string] through browser-url

  return (
    <Stack
      id="Feed"
      sx={{
        flexDirection: { lg: "row", xs: "column" },
        bgcolor: { xs: "#312d2d" },
        color: "#fff",
      }}
    >
      {/*       * Side-Bar       */}

      {/*       ? Hey, Tell Me.. Should I Show [Side-Bar] In The [Search-Component] Or Not?        */}

      {/* <SideBar
        SelectedCategory={SelectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> */}

      {/* * Videos-Container Passing Category & Videos(Containing API Fetched Data) States  */}
      <VideosBox
        searchString={searchString}
        // SelectedCategory={SelectedCategory}  // ? I think There's no need to pass category, as we're using this as search-Results-Videos-Box
        Videos={Videos}
      />
    </Stack>
  );
};

export default Search;
