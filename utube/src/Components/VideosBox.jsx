import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FetchAPI } from "../Utiles/FetchThroughAPI";

// * Called-By-Search-Component
// * Called-By-Feed-Component
// * Called-By-
const VideosBox = ({ searchString, SelectedCategory }) => {
  const { Videos, setVideos } = useContext(Context);

  // if (Videos) {
  //   console.log("CHannel Videobox: ", Videos?.items[0]?.snippet?.channelTitle);
  // }

  console.log(Videos);

  return (
    <Box
      // * Max-Width At xl -> 93rem & At lg -> 72rem
      sx={{ maxWidth: { xl: "93rem", lg: "72rem" } }}
      style={{ margin: "0 auto", padding: "2rem" }}
    >
      {(searchString && (
        <Typography variant="h4">
          {" "}
          <Box component="span" color={"red"}>
            Search Results For
          </Box>{" "}
          "{searchString}"{" "}
        </Typography>
      )) || (
        <Typography variant="h4" color="#fff" mb={"1.2rem"}>
          {SelectedCategory || Videos?.items[0]?.snippet?.channelTitle} -{" "}
          <Box component="span" color={"red"}>
            Videos
          </Box>
        </Typography>
      )}
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        gap={"1rem"}
        sx={{
          p: "1rem",
          // // background: { xs: 'red', sm: 'orange', md: 'yellow', lg: 'white', xl: 'cyan' }
        }}
        flexWrap={"wrap"}
      >
        {Videos &&
          Videos?.items.map((item, ind) => (
            // // <Box key={ind} sx={{
            // //   border: '2px solid red',
            // //   height: '10rem',
            // //   width: '10rem',
            // //   p: '2rem'
            // // }}>
            // //   <h3 >Hey there this is demo title</h3></Box>
            <>
              {item?.id?.videoId && <VideoCard item={item} />}{" "}
              {/* // * Video-Id Must Be To Call The VideoCard Component*/}
              {item?.id?.channelId && <ChannelCard item={item} />}
            </>
          ))}
      </Stack>
      <Button
        sx={{ m: "auto", width: "100%", color: "#fff" }}
        onClick={async (e) => {
          // // console.log("Button");
          // //  FetchVideosThroughSearch("Dear sir");
          // * Fetching New-Items Based On The Given-Next-Page-Token
          const data = await FetchAPI(
            `search?part=snippet&q=${SelectedCategory}&maxResults=${"50"}&pageToken=${
              Videos.nextPageToken
            }`
          );
          
          // * Manipulating The [Recently-Fetched-Video-Items] With The [All-Previous-Video-Items] By Appending Them With "Spread-Syntax"
          data.items = [...(Videos.items), ...(data.items)];

          // * And then, Updating The [State-Variable]
          setVideos(data);
        }}
      >
        <KeyboardArrowDownIcon />
      </Button>
    </Box>
  );
};

export default VideosBox;
