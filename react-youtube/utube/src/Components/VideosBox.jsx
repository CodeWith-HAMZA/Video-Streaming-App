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
const VideosBox = ({
  showChannelCard,
  searchString,
  SelectedCategory,
  FetchMore_WithNextPageToken,
}) => {
  const { Videos, IsLoading } = useContext(Context);

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
            <>
              {item?.id?.videoId && <VideoCard item={item} />}{" "}
              
              {/* // * Video-Id Must Be To Call The VideoCard Component*/}
              {item?.id?.channelId && showChannelCard && <ChannelCard item={item} />}
            </>
          ))}
      </Stack>
      {(IsLoading && (
        <CircularProgress
          sx={{ display: "block", mx: "auto", my: "1.4rem", color: "#fff" }}
        />
      )) || (
        <Button
          sx={{ m: "auto", width: "100%", color: "#fff" }}
          onClick={FetchMore_WithNextPageToken}
        >
          <KeyboardArrowDownIcon />
        </Button>
      )}
    </Box>
  );
};

export default VideosBox;
