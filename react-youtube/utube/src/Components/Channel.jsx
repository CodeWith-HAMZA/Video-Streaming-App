import { CssBaseline } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context/Context";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import ChannelCard from "./ChannelCard";
import VideosBox from "./VideosBox";
const Channel = () => {
  const { SelectedCategory } = useContext(Context);

  const { channelId } = useParams(); // * Getting The Channel-Id through "Params"
  let data;
  const [ChannelDetails, setChannelDetails] = useState(null);
  const [ChannelVideos, setChannelVideos] = useState(null);

  console.log("channel videos ", ChannelVideos);

  useEffect(() => {
    (async () => {
      // * Fetching The Given Channel-Details
      const channelDetails = await FetchAPI(
        `channels?part=snippet,statistics&id=${channelId}`
      );
      // console.log("this is tems", channelDetails.items[0]);
      setChannelDetails(channelDetails?.items[0]); // * Current-Channel-Details State

      // * Fetching The Given Channel-Videos
      const channelVideos = await FetchAPI(
        `search?part=snippet,id&channelId=${channelId}&order=date&maxResults=50`
      );
      setChannelVideos(channelVideos); // * Current-Channel-Videos State
    })();
  }, [channelId]);
  return (
    <Box>
      <Container maxWidth="lg">
        <Stack

        // flexDirection="column"
        // justifyContent="center"
        // alignItems="center" 
        >
          <Box
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(195,135,62,1) 0%, rgba(212,85,60,1) 16%, rgba(0,0,0,1) 100%)",
              maxWidth: "100%",
              height: "18rem",
            }}
          />
          {ChannelDetails && (
            <ChannelCard marginTop={"-5rem"} item={ChannelDetails} />
          )}
        </Stack>

        {ChannelVideos && (
          <VideosBox
            SelectedCategory={SelectedCategory}
            Videos={ChannelVideos}
          />
        )}
      </Container>
    </Box>
  );
};

export default Channel;
